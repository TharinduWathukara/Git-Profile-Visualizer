import { Injectable , OnInit} from '@angular/core';
import { Http , Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService implements OnInit {
  private isSignIn:boolean;
  private gitUsername:string;

  constructor(private http:Http) { }

  ngOnInit(){
    this.isSignIn=false;
  }

  // for sign up
  signUp(fullname:string,gitusername:string,email:string,password:string,passwordConf:string){

    let user={
      "fullname":fullname,
      "email":email,
      "gitusername":gitusername,
      "password":password,
      "passwordConf":passwordConf
    }

    return this.http.post('/getsignUp', user,{withCredentials: true}).map(res=>res.json());
  }

  // for sign in
  signIn(email:string, password:string){

    let user = {
      "logemail":email,
      "logpassword":password
    }
    return this.http.post('/getsignIn', user,{withCredentials: true}).map(res => res.json());
  }

  // for signout
  signOut(){
    return this.http.get('/getsignOut',{withCredentials: true}).map(res => res.json());
  }

  // for get the git profile
  getProfile(){
    return this.http.get('/getprofile',{withCredentials: true}).map(res => res.json()); 
  }

  // run this function when user sign in
  setSignIn(username){
    this.isSignIn=true;
    this.gitUsername=username;
  }

  // run this function when user signout
  setSignOut(){
    this.isSignIn=false;
    this.gitUsername=null;
  }

  // return that user sign in or not
  isAuthenticate(){
    return this.isSignIn;
  }

  // return the gitusername
  getUsername(){
    return this.gitUsername;
  }

}
