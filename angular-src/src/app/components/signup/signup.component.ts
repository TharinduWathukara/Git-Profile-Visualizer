import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/AuthenticationService';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/ProfileService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private sfullname:string;
  private semail:string;
  private sgitusername:string;
  private spassword:string;
  private spasswordConf:string;


  // for errors
  private err:string;

  constructor(private authservice:AuthenticationService,private router:Router,private profileservice:ProfileService) { }

  ngOnInit() {
  }

  signUp(){
    // front end vludation
    if(this.sfullname && this.semail && this.sgitusername && this.spassword && this.spasswordConf){

      if(this.spassword == this.spasswordConf){

        // check for email match with github email
        this.profileservice.getGitHubuserProfileInfo(this.sgitusername).subscribe(user =>{
          if(user.email == this.semail){
            this.authservice.signUp(this.sfullname,this.sgitusername,this.semail,this.spassword,this.spasswordConf).subscribe(data=>{
              this.authservice.setSignIn(data.username);
              this.router.navigate(['profile']);
            },
            err =>{
              this.err=err;
            });
          }else{
            this.err = "Your email doesn't match with your GitHub email please try with your correct GitHub email or sign in with GitHub."
          }
        });

      }else{
        this.err = "Your confirmed password doen't match."
      }
      
    }else{
      this.err = "All fields requires."
    }
  }
}
