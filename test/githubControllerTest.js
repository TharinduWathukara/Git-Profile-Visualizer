var expect  = require('chai').expect;
var assert = require('chai').assert;
var request = require('request');

describe('Test - GitHubController',function(){
    describe('Test - GetUser - User1',function(){
        this.timeout(3000);
        it('Test 1 - name', function(done) {
            request('http://localhost:8080/getgithubuser/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.name,'Wathukarage Tharindu Gayan Wathukara');
                done();
            });
        });
        it('Test 2 - location', function(done) {
            request('http://localhost:8080/getgithubuser/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.location,'Moratuwa');
                done();
            });
        });
        it('Test 3 - blog', function(done) {
            request('http://localhost:8080/getgithubuser/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.blog,'wtgwathukara.wixsite.com/wathukara');
                done();
            });
        });
        it('Test 4 - email', function(done) {
            request('http://localhost:8080/getgithubuser/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.email,'wtgwathukara@gmail.com');
                done();
            });
        });
        it('Test 5 - public repos', function(done) {
            request('http://localhost:8080/getgithubuser/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.public_repos,13);
                done();
            });
        });
        it('Test 6 - public gists', function(done) {
            request('http://localhost:8080/getgithubuser/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.public_gists,0);
                done();
            });
        });
        it('Test 7 - num of followers', function(done) {
            request('http://localhost:8080/getgithubuser/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.followers,1);
                done();
            });
        });
        it('Test 8 - num of followings', function(done) {
            request('http://localhost:8080/getgithubuser/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.following,0);
                done();
            });
        });
        it('Test 9 - num of login', function(done) {
            request('http://localhost:8080/getgithubuser/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.login,'TharinduWathukara');
                done();
            });
        });
        it('Test 10 - created at', function(done) {
            request('http://localhost:8080/getgithubuser/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.created_at,'Febuary 2, 2017');
                done();
            });
        });
    });

    describe('Test - GetUser - User2',function(){
        this.timeout(3000);
        it('Test 1 - name', function(done) {
            request('http://localhost:8080/getgithubuser/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.name,'Mahesh Suranga')
                done();
            });
        });
        it('Test 2 - location', function(done) {
            request('http://localhost:8080/getgithubuser/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.location,null);
                done();
            });
        });
        it('Test 3 - blog', function(done) {
            request('http://localhost:8080/getgithubuser/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.blog,'');
                done();
            });
        });
        it('Test 4 - email', function(done) {
            request('http://localhost:8080/getgithubuser/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.email,'mahesh.15@cse.mrt.ac.lk');
                done();
            });
        });
        it('Test 5 - public repos', function(done) {
            request('http://localhost:8080/getgithubuser/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.public_repos,11);
                done();
            });
        });
        it('Test 6 - public gists', function(done) {
            request('http://localhost:8080/getgithubuser/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.public_gists,0);
                done();
            });
        });
        it('Test 7 - num of followers', function(done) {
            request('http://localhost:8080/getgithubuser/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.followers,0);
                done();
            });
        });
        it('Test 8 - num of followings', function(done) {
            request('http://localhost:8080/getgithubuser/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.following,0);
                done();
            });
        });
        it('Test 9 - num of login', function(done) {
            request('http://localhost:8080/getgithubuser/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.login,'MaheshSuranga');
                done();
            });
        });
        it('Test 10 - created at', function(done) {
            request('http://localhost:8080/getgithubuser/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.created_at,'Febuary 1, 2017');
                done();
            });
        });
    });

    describe('Test - GetUserRepos - User1',function(){
        this.timeout(3000);
        it('Test 1 - Total repos', function(done) {
            request('http://localhost:8080/getrepositories/TharinduWathukara' , function(error, response, body) {   
                body = JSON.parse(body);
                assert.equal(body.length,13);
                done();
            });
        });
    });
    describe('Test - GetUserRepos - User2',function(){
        this.timeout(3000);
        it('Test 1 - Total repos', function(done) {
            request('http://localhost:8080/getrepositories/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.length,11);
                done();
            });
        });
    });

    describe('Test - GetReposDetails - User1',function(){
        this.timeout(5000);
        it('Test 1 - num of watching', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoWatching.length,13);
                done();
            });
        });
        it('Test 2 - array of watching', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.popularByWatching.length,13);
                done();
            });
        });
        it('Test 3 - First element of watching', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoWatching[0],'CEB');
                done();
            });
        });
        it('Test 4 - First element of array of count', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.popularByWatching[0],2);
                done();
            });
        });
        it('Test 5 - num of stars', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoStars.length,13);
                done();
            });
        });
        it('Test 6 - array of stars', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.popularByStars.length,13);
                done();
            });
        });
        it('Test 7 - First element of stars', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoStars[0],'CEB');
                done();
            });
        });
        it('Test 8 - First element of array of stars', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.popularByStars[0],2);
                done();
            });
        });
        it('Test 9 - num of size', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoSize.length,13);
                done();
            });
        });
        it('Test 10 - array of size', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.sizeOfRepo.length,13);
                done();
            });
        });
        it('Test 11 - First element of size', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoSize[0],'GameX');
                done();
            });
        });
        it('Test 12 - First element of array of size', function(done) {
            request('http://localhost:8080/getReposDetails/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.sizeOfRepo[0],7220);
                done();
            });
        });
    });
    describe('Test - GetReposDetails - User2',function(){
        this.timeout(5000);
        it('Test 1 - num of watching', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoWatching.length,11);
                done();
            });
        });
        it('Test 2 - array of watching', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.popularByWatching.length,11);
                done();
            });
        });
        it('Test 3 - First element of watching', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoWatching[0],'angular-tour-of-heroes');
                done();
            });
        });
        it('Test 4 - First element of array of count', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.popularByWatching[0],0);
                done();
            });
        });
        it('Test 5 - num of stars', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoStars.length,11);
                done();
            });
        });
        it('Test 6 - array of stars', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.popularByStars.length,11);
                done();
            });
        });
        it('Test 7 - First element of stars', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoStars[0],'angular-tour-of-heroes');
                done();
            });
        });
        it('Test 8 - First element of array of stars', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.popularByStars[0],0);
                done();
            });
        });
        it('Test 9 - num of size', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoSize.length,11);
                done();
            });
        });
        it('Test 10 - array of size', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.sizeOfRepo.length,11);
                done();
            });
        });
        it('Test 11 - First element of size', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repoSize[0],'BiometricAuthentication');
                done();
            });
        });
        it('Test 12 - First element of array of size', function(done) {
            request('http://localhost:8080/getReposDetails/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.sizeOfRepo[0],7227);
                done();
            });
        });
    });
    
    describe('Test - GetPopularLanguages - User1',function(){
        this.timeout(5000);
        it('Test 1 - Total Languages', function(done) {
            request('http://localhost:8080/getPopularLanguages/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages.length,4);
                done();
            });
        });
        it('Test 2 - Most popular', function(done) {
            request('http://localhost:8080/getPopularLanguages/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages[0],'Java');
                done();
            });
        });
        it('Test 3 - Most popular', function(done) {
            request('http://localhost:8080/getPopularLanguages/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.count[0],6);
                done();
            });
        });
    });

    describe('Test - GetPopularLanguages - User2',function(){
        this.timeout(5000);
        it('Test 1 - Total Languages', function(done) {
            request('http://localhost:8080/getPopularLanguages/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages.length,4);
                done();
            });
        });
        it('Test 2 - Most popular', function(done) {
            request('http://localhost:8080/getPopularLanguages/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages[0],'Java');
                done();
            });
        });
        it('Test 3 - Most popular count', function(done) {
            request('http://localhost:8080/getPopularLanguages/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.count[0],7);
                done();
            });
        });
    });

    describe('Test - GetRepoCommits - User 1',function(){
        this.timeout(6000);
        it('Test 1 - Most Commited repo', function(done) {
            request('http://localhost:8080/getRepoCommits/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repositories[0],'SimpleExpenseManager');
                done();
            });
        });
        it('Test 2 - Commit number ', function(done) {
            request('http://localhost:8080/getRepoCommits/TharinduWathukara' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.commits[0],29);
                done();
            });
        });
    });
    describe('Test - GetRepoCommits - User 2',function(){
        this.timeout(6000);
        it('Test 1 - Most Commited repo', function(done) {
            request('http://localhost:8080/getRepoCommits/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.repositories[0],'SimpleExpenseManager');
                done();
            });
        });
        it('Test 2 - Commit number ', function(done) {
            request('http://localhost:8080/getRepoCommits/MaheshSuranga' , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.commits[0],28);
                done();
            });
        });
    });

    describe('Test - GetRepo - User1 - Repo1',function(){
        this.timeout(3000);
        it('Test 1 - Full name ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepo',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.full_name,'TharinduWathukara/GitProfileVisualizer');
                done();
            });
        });
        it('Test 2 - starts ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepo',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.stargazers_count,2);
                done();
            });
        });
        it('Test 3 - watchers ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepo',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.watchers_count,2);
                done();
            });
        });
        it('Test 4 - size ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepo',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.size,6571);
                done();
            });
        });
        it('Test 5 - Language ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepo',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.language,'HTML');
                done();
            });
        });
    });
    describe('Test - GetRepo - User1 - Repo2',function(){
        this.timeout(3000);
        it('Test 1 - Full name ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepo',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.full_name,'TharinduWathukara/CEB');
                done();
            });
        });
        it('Test 2 - starts ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepo',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.stargazers_count,2);
                done();
            });
        });
        it('Test 3 - watchers ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepo',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.watchers_count,2);
                done();
            });
        });
        it('Test 4 - size ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepo',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.size,1405);
                done();
            });
        });
        it('Test 5 - Language ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepo',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.language,'PHP');
                done();
            });
        });
    });

    describe('Test - GetRepoLanguages - User1 - Repo1',function(){
        this.timeout(3000);
        it('Test 1 - Language1 ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepoLanguages',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages[0],'PHP');
                done();
            });
        });
        it('Test 2 - Language2 ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepoLanguages',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages[1],'CSS');
                done();
            });
        });
        it('Test 3 - Language3 ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepoLanguages',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages[2],'HTML');
                done();
            });
        });
        it('Test 4 - Language4 ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepoLanguages',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages[3],'JavaScript');
                done();
            });
        });
    });
    describe('Test - GetRepoLanguages - User1 - Repo2',function(){
        this.timeout(3000);
        it('Test 1 - Language1 ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepoLanguages',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages[0],'HTML');
                done();
            });
        });
        it('Test 2 - Language2 ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepoLanguages',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages[1],'TypeScript');
                done();
            });
        });
        it('Test 3 - Language3 ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepoLanguages',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages[2],'JavaScript');
                done();
            });
        });
        it('Test 4 - Language4 ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepoLanguages',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.languages[3],'CSS');
                done();
            });
        });
    });

    describe('Test - GetRepoStats - User1 - Repo1',function(){
        this.timeout(10000);
        it('Test 1 - months ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepoStats',form:data} , function(error, response, body) {
                body = JSON.parse(body);

                assert.equal(body.dates.length,4);
                done();
            });
        });
        it('Test 2 - contributors by stats ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepoStats',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.contributorsByStats.length,3);
                done();
            });
        });
        it('Test 3 - contributors by commit ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepoStats',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.contributorsByCommits.length,3);
                done();
            });
        });
        it('Test 4 - max by commit ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepoStats',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.contributionsByStats[0],2809);
                done();
            });
        });
        it('Test 5 - max by commit ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getRepoStats',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.contributionsByCommits[0],10);
                done();
            });
        });
    });
    describe('Test - GetRepoStats - User1 - Repo2',function(){
        this.timeout(10000);
        it('Test 1 - months ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepoStats',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.dates.length,3);
                done();
            });
        });
        it('Test 2 - contributors by stats ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepoStats',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.contributorsByStats.length,3);
                done();
            });
        });
        it('Test 3 - contributors by commit ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepoStats',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.contributorsByCommits.length,3);
                done();
            });
        });
        it('Test 4 - max by commit ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepoStats',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.contributionsByStats[0],18386);
                done();
            });
        });
        it('Test 5 - max by commit ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"CEB"
            }
            request.post({url:'http://localhost:8080/getRepoStats',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.contributionsByCommits[0],12);
                done();
            });
        });
    });

    describe('Test - GetCodeQuality - User1 - Repo1',function(){
        this.timeout(25000);
        it('Test 1 - Code Quality ', function(done) {
            let data = {
                "username":"TharinduWathukara",
                "name":"GitProfileVisualizer"
            }
            request.post({url:'http://localhost:8080/getCodeQuality',form:data} , function(error, response, body) {
                body = JSON.parse(body);
                assert.equal(body.summary.total,3737);
                assert.equal(body.summary.source,3179);
                assert.equal(body.summary.empty,375);
                assert.equal(body.summary.comment,224);
                assert.equal(body.summary.single,178);
                assert.equal(body.summary.block,46);
                assert.equal(body.summary.todo,3);
                assert.equal(body.summary.outLenghtLines,47);                
                done();
            });
        });
    });
});