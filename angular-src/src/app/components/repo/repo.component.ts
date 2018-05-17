import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/ProfileService';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/AuthenticationService';
import { SearchPipe } from '../../pipes/search.pipe';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
  // variables to save repository details
  private repo:any[];
  private languages:any[];
  private statistics:any[];
  private username:string;
  private codeQuality:any[];
  private codeQualitySummary:any[];
  private codeQualityLoading:boolean;
  private file_name:string;


  //charts
  private chart1:any;  //for statistics
  private chart2:any;  //for contributions by statistics
  private chart3:any;  //for contributions by number of commits

  constructor(private profileService:ProfileService,private route:ActivatedRoute, 
    private authService:AuthenticationService, private router:Router) { }

  ngOnInit() {
    // check for authentication
    if(this.authService.isAuthenticate()){
      this.getRepoDetails();
    }
    else{
      this.authService.getProfile().subscribe(data =>{
        if(data.username){
          this.authService.setSignIn(data.username);
          this.getRepoDetails();
        }else{
          this.router.navigate(['signIn']);
        }
      },err =>{
        this.router.navigate(['signIn']);
      });
    }
  }

  // get code quality results when user clicks analyze code this function calls
  getCodeQuality(){
    this.codeQualityLoading = true;
    this.profileService.getCodeQuality(this.username,this.route.snapshot.params['name']).subscribe(data =>{
      this.codeQualityLoading = false;
      this.codeQuality = data.files;
      this.codeQualitySummary = data.summary;
    });
  }

  // get repo details
  getRepoDetails(){
    this.username = this.authService.getUsername();
    this.getRepo(this.username,this.route.snapshot.params['name']);
    this.getLanguages(this.username,this.route.snapshot.params['name']);
    this.getRepoStatistics(this.username,this.route.snapshot.params['name']);
  }

  // get this repository details
  getRepo(username:string,name:string){
    this.profileService.getRepo(username,name).subscribe(repo=>{
      this.repo=repo;
    });
  }

  // get all languages of this repo
  getLanguages(username:string,name:string){
    this.profileService.getRepoLanguages(username,name).subscribe(data=>{
      this.languages=data.languages;
    })
  }

  // get statistics of the repository
  getRepoStatistics(username:string,name:string){
    this.profileService.getRepoStatistics(username,name).subscribe(data=>{
      this.statistics=data;

      setTimeout(()=>{
        // Repo statistics
        let ctx1 = document.getElementById('canvas1');
        this.chart1 = new Chart(ctx1,{
          type: 'line',
          data:{
            labels:data.dates,
            datasets: [{
              label: 'Total',
              backgroundColor:'lightsalmon',
              borderColor: 'red',
              data:data.statsTotal,
              fill: true
            }
          ]},
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Repo statistics'
            },
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            scales: {
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Month'
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Value'
                }
              }]
            }
          }    
        });

        //contributions by statistics
        let ctx2 = document.getElementById('canvas2');
        this.chart2 = new Chart(ctx2,{
          type: 'doughnut',
          data:{
            datasets:[{
              data:data.contributionsByStats,
              backgroundColor: [
                'red',
                'orange',
                'royalblue',
                'green',
                'aqua',
                'yellow',
                'plum',
                'pink',
                'burlywood',
                'peru',
                'silver'
              ],
              label: 'Statistics'
            }],
            labels:data.contributorsByStats
          },
          options: {
            responsive: true,
            legend: {
              position: 'top',
              display:false,
              labels:{
                usePointStyle:true,
                padding:5,
                fontSize:12,
              }
            },
            title: {
              display: true,
              text: 'By the statistics'
            },
            animation: {
              animateScale: true,
              animateRotate: true
            }
          }
        });

        //contribution by number of commits
        let ctx3 = document.getElementById('canvas3');
        this.chart3 = new Chart(ctx3,{
          type: 'doughnut',
          data:{
            datasets:[{
              data:data.contributionsByCommits,
              backgroundColor: [
                'red',
                'orange',
                'royalblue',
                'green',
                'aqua',
                'yellow',
                'plum',
                'pink',
                'burlywood',
                'peru',
                'silver'
              ],
              label: 'Number of Commits'
            }],
            labels:data.contributorsByCommits
          },
          options: {
            responsive: true,
            legend: {
              position: 'top',
              display:false,
              labels:{
                usePointStyle:true,
                padding:5,
                fontSize:12,
              }
            },
            title: {
              display: true,
              text: 'By number of Commits'
            },
            animation: {
              animateScale: true,
              animateRotate: true
            }
          }
        });

      });
    })
  }

}
