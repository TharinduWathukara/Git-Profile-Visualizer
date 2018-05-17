import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {


  constructor(private http: Http){
  }

  // to get github user details
  getGitHubuserProfileInfo(username: string){
    return this.http.get('/getgithubuser/'.concat(username)).map(res => res.json());
  }

  // get git repositories
  getGitRepositories(username:string){
    return this.http.get('/getrepositories/'.concat(username)).map(res=>res.json());
  }

  // get git repo details such start watching and size
  getReposDetails(username:string){
    return this.http.get('/getReposDetails/'.concat(username)).map(res=>res.json());
  }

  // get commits per repo
  getRepoCommits(username:string){
    return this.http.get('/getRepoCommits/'.concat(username)).map(res=>res.json());
  }

  // get popular languages of git user
  getPopularLanguages(username:string){
    return this.http.get('/getPopularLanguages/'.concat(username)).map(res=>res.json());
  }

  // get a single repo - unique repo
  getRepo(username:string,name:string){
    let data={
      "username":username,
      "name":name
    }
    return this.http.post('/getRepo',data,{withCredentials: true}).map(res=>res.json());
  }
  
  // get all languages of a repo
  getRepoLanguages(username:string,name:string){
    let data={
      "username":username,
      "name":name
    }
    return this.http.post('/getRepoLanguages',data,{withCredentials: true}).map(res=>res.json());
  }
  
  // get all statistics about a repo
  getRepoStatistics(username:string,name:string){
    let data = {
      "username":username,
      "name":name
    }
    return this.http.post('/getRepoStats',data,{withCredentials:true}).map(res=>res.json());
  }

  // get code quality of a repo
  getCodeQuality(username:string,name:string){
    let data = {
      "username":username,
      "name":name
    }
    return this.http.post('/getCodeQuality',data,{withCredentials:true}).map(res=>res.json());
  }

}
