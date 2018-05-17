const User = require('../mongodb/userschema');
const request = require('request');
const {githubConfig} = require ('../config');

mongodbFunction = {
  // sign up function
  signUp:(req,res,next)=>{

    // backend validations
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.send("passwords dont match");
      return next(err);
    }
    // check that all fields are available
    if (req.body.email && req.body.gitusername && req.body.fullname && req.body.password) {
  
      var userData = {
        email: req.body.email,
        gitusername: req.body.gitusername,
        fullname: req.body.fullname,
        password: req.body.password,
      }
  
      // create a user using available details
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.user = user;
          req.session.cookie.expires = new Date(Date.now() + 3600000);
          req.session.cookie.maxAge = 3600000;
          return res.redirect('/getprofile');
        }
      });
  
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  },

  // sign up function
  signIn :(req,res,next)=>{
    // check email and password are available
    if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
        } else {
          req.session.user = user;
          req.session.cookie.expires = new Date(Date.now() + 3600000);
          req.session.cookie.maxAge = 3600000;
          return res.redirect('/getprofile');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
  },

  // get profile function
  getProfile:(req,res,next)=>{

    // check for login way using github or not
    if(req.session.user.authBy == 'viaGithub'){
      let usr = req.session.user;
      res.json({username:usr.gitusername});
    }
    
    else {
      User.findById(req.session.user._id)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          if (user === null) {
            var err = new Error('Not authorized! Go back!');
            err.status = 400;
            return next(err);
          } else {
            res.json({username: user.gitusername});
          }
        }
      });
    }
  },

  // sign out function
  signOut:(req,res,next)=>{
    if (req.session.user) {
      req.session.user=null;
      res.json({"message":"Successfully SignOut"});
    }
  },

  // sign in with github function
  signInWithGithub:(req,res)=>{

    const { query } = req;
    const { code } = query;

    if(!code){
      res.json({
        'success':false,
        'message':"Error: no code"
      });
    }

    // get user using the token
    request.post('https://github.com/login/oauth/access_token?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret + '&code=' + code, {headers: {'User-Agent':'GIT Profile Visualizer', 'Accept':'application/json'}},
      (err,body,response) => {
        if(err) console.log(err);
        else{

          const accessToken = (JSON.parse(body.body)).access_token;
          
          request.get('https://api.github.com/user' ,{headers: {'User-Agent':'GIT Profile Visualizer', 'Authorization': 'token ' + accessToken }},
          (err1,body1,response1) => {
            let data = (JSON.parse(body1.body));
            let user = {
              'email': data.email,
              'gitusername': data.login,
              'fullname': data.name,
              'authBy': 'viaGithub'
            }

            req.session.user = user;
            req.session.cookie.expires = new Date(Date.now() + 3600000);
            req.session.cookie.maxAge = 3600000;

            // redirect to profile
            res.redirect('https://git-profile-visualizer.herokuapp.com/profile');
          });
        }
    });
  }
}

module.exports = mongodbFunction;