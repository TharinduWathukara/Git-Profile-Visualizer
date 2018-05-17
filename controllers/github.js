const request = require('request');
var sloc  = require('sloc');

const {githubConfig} = require ('../config');

githubFunctions = {

    //this function returns the git user details from {https://api.github.com/users/:username}
    getUser: (req,res) => {
        request.get('https://api.github.com/users/' + req.params.username + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var user = JSON.parse(body.body);
                user.created_at = convertDate(user.created_at);
                user.updated_at = convertDate(user.updated_at);

                res.json(user);

                // covert date to readable way
                function convertDate(date){
                    var month = ["January","Febuary","March","April","May","June","July","Auguest","September","Octomber" ,"November","December"];
                    var d = new Date(date);
                    var newDate = month[d.getMonth()] + ' ' + d.getDate().toString() + ', ' + d.getFullYear().toString();
                    return newDate;

                }

            }
        })
    },

    //this function returns the details about all the repositories of a paticular user from {https://api.github.com/users/:username/repos}
    getUserRepos:(req,res)=>{
        request.get('https://api.github.com/users/' + req.params.username+ '/repos' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var repos = JSON.parse(body.body);

                for(var i=0;i<repos.length;i++){
                    repos[i].created_at = convertDate(repos[i].created_at);
                    repos[i].pushed_at = convertDate(repos[i].pushed_at);
                }

                res.json(repos);

                // covert date to readable way
                function convertDate(date){
                    var month = ["January","Febuary","March","April","May","June","July","Auguest","September","Octomber" ,"November","December"];
                    var d = new Date(date);
                    var newDate = month[d.getMonth()] + ' ' + d.getDate().toString() + ', ' + d.getFullYear().toString();
                    return newDate;

                }
            }
        })
    },

    //this function analyze one's git profile and return popular repositories by watching, by stars and the size of the repos(KB)
    getReposDetails:(req,res)=>{
        request.get('https://api.github.com/users/' + req.params.username+ '/repos' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var repos = JSON.parse(body.body);
                // set vaiables
                var repo = [];
                var popularByWatching = [];
                var popularByStars = [];
                var sizeOfRepo = [];

                for(var i=0; i<repos.length;i++){
                    repo.push(repos[i].name);
                    popularByWatching.push(repos[i].watchers_count);
                    popularByStars.push(repos[i].stargazers_count);
                    sizeOfRepo.push(repos[i].size);
                }

                var loop=15;
                if(repos.length<=loop){
                    loop=repos.length
                }
                var repoWatching = [];
                var newPopularByWatching = [];
                for(var j=0;j<loop;j++){
                    var idx = popularByWatching.indexOf(Math.max.apply(null,popularByWatching));
                    repoWatching.push(repo[idx]);
                    newPopularByWatching.push(popularByWatching[idx]);
                    popularByWatching[idx]=-1;
                }
                var repoStars = [];
                var newPopularByStars = [];
                for(var j=0;j<loop;j++){
                    var idx = popularByStars.indexOf(Math.max.apply(null,popularByStars));
                    repoStars.push(repo[idx]);
                    newPopularByStars.push(popularByStars[idx]);
                    popularByStars[idx]=-1;
                }
                var repoSize = [];
                var newSizeOfRepo = [];
                for(var j=0;j<loop;j++){
                    var idx = sizeOfRepo.indexOf(Math.max.apply(null,sizeOfRepo));
                    repoSize.push(repo[idx]);
                    newSizeOfRepo.push(sizeOfRepo[idx]);
                    sizeOfRepo[idx]=-1;
                }

                var data={
                    'repoWatching':repoWatching,
                    'popularByWatching':newPopularByWatching,
                    'repoStars':repoStars,
                    'popularByStars':newPopularByStars,
                    'repoSize':repoSize,
                    'sizeOfRepo':newSizeOfRepo
                }
                res.json(data);
            }
        })
    },

    //this function returns git user's most widely used languages decending order.
    getPopularLanguages:(req,res)=>{
        request.get('https://api.github.com/users/' + req.params.username+ '/repos' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var repos = JSON.parse(body.body);
                var languages = [];
                var count = [];

                for(var i=0;i<repos.length;i++){
                    var lan = repos[i].language;
                    if(languages.includes(lan)){
                        var index = languages.indexOf(lan);
                        count[index]=count[index]+1;
                    }
                    else{
                        languages.push(lan);
                        count.push(1);
                    }
                }
                var loop=15;
                if(languages.length<=loop){
                    loop=languages.length
                }
                var newLanguages = [];
                var newcount = [];
                for(var j=0;j<loop;j++){
                    var idx = count.indexOf(Math.max.apply(null,count));
                    newLanguages.push(languages[idx]);
                    newcount.push(count[idx]);
                    count[idx]=-1;

                }

                var data={
                    'languages':newLanguages,
                    'count':newcount
                }
                res.json(data);
            }
        })
    },

    // this function returns the number of commits in a repo
    getRepoCommits:(req,res)=>{
        request.get('https://api.github.com/users/' + req.params.username+ '/repos' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var repos = JSON.parse(body.body);
                var data = {
                    'repositories' : [],
                    'commits' : []
                }

                for (var i=0;i<repos.length;i++){
                    this.data = numOfCommits(data,repos,i);
                }

                // get number of commits function
                function numOfCommits(data,repos,i){
                    request.get('https://api.github.com/repos/' + req.params.username+ '/' + repos[i].name + '/commits' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
                    (err,body,response) => {
                        if(err) console.log(err);
                        else{
                            var commit = JSON.parse(body.body);

                            data.repositories.push(repos[i].name);
                            data.commits.push(commit.length);

                            if(i==repos.length-1){
                                setTimeout(()=>{
                                    var loop=15;
                                    if(data.repositories.length<=loop){
                                        loop=data.repositories.length
                                    }
                                    var newRepositories = [];
                                    var newCommits = [];
                                    for(var j=0;j<loop;j++){
                                        var idx = data.commits.indexOf(Math.max.apply(null,data.commits));
                                        newRepositories.push(data.repositories[idx]);
                                        newCommits.push(data.commits[idx]);
                                        data.commits[idx]=-1;
                                    }

                                    data.repositories = newRepositories;
                                    data.commits = newCommits;

                                    res.json(data);
                                },500);
                            }else{
                                return data;
                            }
                        }
                    });
                }
            }
        });
    },

    //this function returns only one repo details
    getRepo:(req,res)=>{
        request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var repo = JSON.parse(body.body);

                repo.created_at = convertDate(repo.created_at);
                repo.updated_at = convertDate(repo.updated_at);
                repo.pushed_at = convertDate(repo.pushed_at);

                res.json(repo);

                function convertDate(date){
                    var month = ["January","Febuary","March","April","May","June","July","Auguest","September","Octomber" ,"November","December"];
                    var d = new Date(date);
                    var newDate = month[d.getMonth()] + ' ' + d.getDate().toString() + ', ' + d.getFullYear().toString();
                    return newDate;

                }
            }
        });
    },

    //this function returns all the languages that used for a paticular repo
    getRepoLanguages:(req,res)=>{
        request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/languages' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var lang = JSON.parse(body.body);
                var languages = [];

                for (var key in lang){
                    languages.push(key);
                }
                data={
                    "languages":languages
                }
                res.json(data);
            }
        });
    },

    //this function returns about the statiscs about a paticular repository such contribution by statistics, number of commits and repository statistics by month to month
    getRepoStats:(req,res)=>{
        request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/commits' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                data={
                    "username":req.body.username,
                    "name":req.body.name
                }
                var commits = JSON.parse(body.body);
                data.commits = commits;
                var dates = [];
                var statsTotal = [];
                // var statsAdditions = [];
                // var statsDeletions = [];

                var contributors = [];

                var contributorsByStats = [];
                var contributionsByStats = [];

                var contributorsByCommits = [];
                var contributionsByCommits = [];

                for(var i=0;i<commits.length;i++){
                    this.data = getStats(data,i);
                }

                // get statistics by month to month for a paticular repo
                function getStats(data,i){
                    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct" ,"Nov","Dec"];
                    request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/commits/' + commits[i].sha + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
                    (err,body,response) => {
                        if(err) console.log(err);
                        else{
                            var commit = JSON.parse(body.body);

                            var d = new Date(commit.commit.author.date);
                            var date = month[d.getMonth()] + " " + d.getFullYear().toString();
                            
                            if(dates.includes(date)){
                                var index = dates.indexOf(date);
                                statsTotal[index]=statsTotal[index] + commit.stats.total;
                            }
                            else{
                                dates.push(date);
                                statsTotal.push(commit.stats.total);
                                
                            }
                            data.dates = dates;
                            data.statsTotal = statsTotal;

                            var contributor = commit.commit.author.name;
                            
                            if(!contributors.includes(contributor)){
                                contributors.push(contributor);
                            }
                            
                            if(contributorsByStats.includes(contributor)){
                                var idx = contributorsByStats.indexOf(contributor);
                                contributionsByStats[idx] = contributionsByStats[idx] + commit.stats.total;
                            }else{
                                contributorsByStats.push(contributor);
                                contributionsByStats.push(commit.stats.total);
                            }

                            if(contributorsByCommits.includes(contributor)){
                                var indx = contributorsByCommits.indexOf(contributor);
                                contributionsByCommits[indx] +=1;
                            }else{
                                contributorsByCommits.push(contributor);
                                contributionsByCommits.push(1);
                            }

                            data.contributorsByStats = contributorsByStats;
                            data.contributionsByStats = contributionsByStats;

                            data.contributorsByCommits = contributorsByCommits;
                            data.contributionsByCommits = contributionsByCommits;
                            
                            if (i == commits.length-1) {

                                let ab = sortByDate(data.dates,data.statsTotal);
                                data.dates = ab.a;
                                data.statsTotal = ab.b;

                                let cd = bubbleSort(data.contributorsByStats,data.contributionsByStats);
                                let ef = bubbleSort(data.contributorsByCommits,data.contributionsByCommits);

                                let newConByStats=[];
                                let newCbtionByStats=[];
                                let newConByCommits=[];
                                let newCbtionByCommits=[];

                                let loop=10;
                                if(contributors.length < loop){
                                    loop = contributors.length;
                                }

                                for(let l=0;l<loop;l++){
                                    newConByStats.push(cd.c[l]);
                                    newCbtionByStats.push(cd.d[l]);
                                    newConByCommits.push(ef.c[l]);
                                    newCbtionByCommits.push(ef.d[l]);
                                }

                                data.contributors = contributors;
                                data.contributorsByStats = newConByStats;
                                data.contributionsByStats = newCbtionByStats;
                                data.contributorsByCommits = newConByCommits;
                                data.contributionsByCommits = newCbtionByCommits;

                                setTimeout(()=>{
                                    res.json(data);
                                },1000);
                            }else{
                                return data;
                            }
                        }
                    });
                }

                // bubble sort for date
                function sortByDate(a,b){
                    var swapped;
                    do {
                        swapped = false;
                        for (var i=0; i < a.length-1; i++) {
                            if (new Date(a[i]) > new Date(a[i+1])) {
                                var temp1 = a[i];
                                var temp2 = b[i];

                                a[i] = a[i+1];
                                b[i] = b[i+1];

                                a[i+1] = temp1;
                                b[i+1] = temp2;

                                swapped = true;
                            }
                        }
                    } while (swapped);
                    return {'a':a,'b':b}
                }

                // bubble sort
                function bubbleSort(c,d){
                    var swapped;
                    do {
                        swapped = false;
                        for (var i=0; i < d.length-1; i++) {
                            if (d[i] < d[i+1]) {
                                var temp1 = c[i];
                                var temp2 = d[i];

                                c[i] = c[i+1];
                                d[i] = d[i+1];
                                
                                c[i+1] = temp1;
                                d[i+1] = temp2;
                                
                                swapped = true;
                            }
                        }
                    } while (swapped);
                    return {'c':c,'d':d}
                }
            }
        });
    },

    //this function return the code quality of the user
    getCodeQuality:(req,res)=>{

        request.get('https://api.github.com/repos/' + req.body.username + '/' + req.body.name + '/contents' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var content = JSON.parse(body.body);
                var data = {
                    summary:{
                        "total" : 0,
                        "source" : 0,
                        "comment" : 0,
                        "single" : 0,
                        "block" : 0,
                        "empty" : 0,
                        "todo" : 0,
                        "outLenghtLines" : 0,
                        "outLenghtFileNames" : []
                    },
                    files:[]
                };

                var promise = new Promise(function(resolve, reject) {
                    getFiles(content,data);
                    resolve("Stuff worked!");
                });

                promise.then(function(result) {
                    setTimeout(()=>{
                        for(var i=0;i<data.files.length;i++){
                            checkCodeQuality(data,i);                        
                        }
                    },12000);
                }, function(err) {
                    console.log("getFiles failed");
                });
                
                // recursive function to get all the files in a github repository
                function getFiles(content,data){
                    for(var i=0;i<content.length;i++){
                        if(content[i].type == 'file' && checkFile(content[i])){
                            var file = {
                                "name":content[i].name,
                                "path":content[i].path,
                                "size":content[i].size,
                                "html_url":content[i].html_url,
                                "download_url":content[i].download_url,                                
                            }
                            data.files.push(file);

                        }else{
                            if(checkDir(content[i])){
                                request.get(content[i].url + '&client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
                                (err,body,response) =>{
                                    if(err) throw err;
                                    else{
                                        var newContent = JSON.parse(body.body);
                                        return getFiles(newContent,data);
                                    }
                                });
                            }
                            
                        }
                    }
                }

                // check code quality fucntion
                function checkCodeQuality(data,i){
                    request.get(data.files[i].download_url + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
                    (err,body,response) =>{
                        if(err) throw err;
                        else{
                            var content = (body.body);
                            checkLineLength(content,data,i);

                            // get the extention of the file
                            var name = data.files[i].name.split('.');
                            var ext = getExtension(name[name.length-1]);

                            // check content with ext
                            var stats = sloc(content,ext);
                            setTimeout(()=>{
                                data.files[i].total = stats['total'];
                                data.files[i].source = stats['source'];
                                data.files[i].comment = stats['comment'];
                                data.files[i].single = stats['single'];
                                data.files[i].block = stats['block'];
                                data.files[i].empty = stats['empty'];
                                data.files[i].todo = stats['todo'];
                                //for summary
                                data.summary.total += stats['total'];
                                data.summary.source += stats['source'];
                                data.summary.comment += stats['comment'];
                                data.summary.single += stats['single'];
                                data.summary.block += stats['block'];
                                data.summary.empty += stats['empty'];
                                data.summary.todo += stats['todo'];
                            },80);
                            
                            if (i == data.files.length-1){
                                setTimeout(()=>{
                                    res.json(data);
                                },3000);
                            }else{
                                return data;
                            }
                        }
                    });
                }

                // get valid extentions to code quality
                function getExtension(name){
                    var validExtensions=["cr", "py", "ls", "mochi", "nix", "r", "rb", "jl",
                    "pl", "yaml", "hr","js", "jsx", "c", "cc", "cpp", "cs", "cxx", "h", "m",
                    "mm", "hpp","hx", "hxx", "ino", "java", "php", "php5", "go", "groovy",
                    "scss", "less", "rs", "sass", "styl", "scala", "swift", "ts", "jade", "gs",
                    "nut", "kt", "kts", "tsx", "fs", "fsi", "fsx", "bsl","latex", "tex", "sty",
                    "cls","lua", "hs","erl","brs", "monkey", "vb","nim","rkt", "clj",
                    "cljs", "hy", "asm"];

                    var invalid=["sql"];

                    if(validExtensions.includes(name)){
                        return name;
                    }else{
                        return 'coffee';
                    }
                }

                // check the line lenght that exceede or not
                function checkLineLength(content,data,i){
                    var outLength = 0;
                    var outLenghtLineNumbers = [];
                    var contentByLine = content.split('\n');
                    for (var j =0;j<contentByLine.length;j++){
                        if(contentByLine[j].length > 140){
                            outLength++;
                            data.summary.outLenghtLines++;
                            outLenghtLineNumbers.push(' ' + (j+1).toString());
                        }
                        data.files[i].outLenghtLines = outLength;
                        data.files[i].outLenghtLineNumbers = outLenghtLineNumbers;
                    }
                    if(data.files[i].outLenghtLines>0){
                        data.summary.outLenghtFileNames.push(' ' + data.files[i].name);
                    }

                }

                // get file function support function to get valid files
                function checkFile(content){
                    var list = ['.json','config','gitignore','README','conf','test','gradle','.pro',
                                '.xml','.mf','.jar','.db','.jpg','.png','.jpeg','.txt','.md','properties',
                                '.form','.ico','.woff2','.iml','bootstrap','jquery','glyphicons','.gif',
                                '.lock','.htaccess'];

                    for(var j=0;j<list.length;j++){
                        if(content.name.includes(list[j])){
                            return false;
                        }
                    }
                    return true;
                }

                // get file function support function to get valid directories                
                function checkDir(content){
                    var list = ['node_modules','dist','build','test','bootstrap','svg'];

                    for(var j=0;j<list.length;j++){
                        if(content.name.includes(list[j])){
                            return false;
                        }
                    }
                    return true;
                }
            }
        });
    }

}

module.exports = githubFunctions;