var express = require('express');
const { config } = require('./dbconnect');
const db = require('./dbconnect');
var router = express.Router();



//카테고리 출력
router.get('/category',function(req, res, next){
    console.log("ret -> /category");
    db.query('SELECT * FROM category',function(err,result,fields){
        res.send(result);
    })
});

//이미 사용된 이메일 체크
router.post('/email_check',function(req, res, next){
    console.log("ret -> /email_check:"+req.query.email);
    db.query('SELECT * FROM user where email='+req.query.email,function(err,result,fields){
        if(result=null){
            res.send({"now": 1});
        }else{
            res.send({"now": 0});
        }
        
    })
});

//회원가입하기
router.get('/register',function(req, res, next){
    console.log("ret -> /register");
    var qry = "INSERT INTO user(uname,email,pw,nickname,profile,jointype) values(";
    qry += "'"+req.query.uname+"',";
    qry += "'"+req.query.email+"',";
    qry += "'"+req.query.pw+"',";
    qry += "'"+req.query.nick+"',";
    qry += "'"+req.query.profile+"',";
    qry += "'"+req.query.type+"')";
    db.query(qry,function(err,result,fields){
        if(err==null){
            console.log("ret -> /register : complete");
            res.send({"result": true});
        }else{
            console.log("ret -> /register : "+err);
            res.send({"result": false});
        }
    })
    
});

//게시글 생성하기
router.get('/create_form',function(req, res, next){
    var qry = "INSERT INTO form(fuid,fcategory,subject,text,maxnum,location,deadline) values(";
    qry += "'"+req.query.fuid+"',";
    qry += req.query.fcategory+",";
    qry += "'"+req.query.subject+"',";
    qry += "'"+req.query.text+"',";
    qry += req.query.maxnum+",";
    qry += "'"+req.query.location+"',";
    qry += "'"+req.query.deadline+"')";
    db.query(qry,function(err,result,fields){
        if(err==null){
            console.log("ret -> /create_form : complete");
            res.send({"result": true});
        }else{
            console.log("ret -> /create_form : "+err);
            res.send({"result": false});
        }
    })
});
    
//사용자 정보 가져오기
router.get('/userlist',function(req, res, next){
    console.log("ret -> /userlist");
    db.query('SELECT * FROM user',function(err,result,fields){
        console.log("ret -> /userlist:"+result);
        res.send(result);
    })
});

//게시글  정보 가져오기
router.get('/formlist',function(req, res, next){
    console.log("ret -> /formlist");
    db.query('SELECT * FROM form',function(err,result,fields){
        console.log("ret -> /userlist:"+result);
        res.send(result);
    })
});

//내정보 가져오기
router.post('/get_user',function(req, res, next){
    console.log("ret -> /get_user:"+req.query.uid);
    db.query('SELECT * FROM user where uid='+req.query.uid,function(err,result,fields){
        if(result=null){
            res.send({"now": 0});
        }else{
            console.log("ret -> /get_user:"+result);
            res.send(result);
        }
        
    })
});

//게시글 정보 가져오기
router.post('/get_form',function(req, res, next){
    console.log("ret -> /get_form:"+req.query.fuid);
    db.query('SELECT * FROM form where fid='+req.query.fuid,function(err,result,fields){
        if(result=null){
            res.send({"now": 0});
        }else{
            console.log("ret -> /get_form:"+result);
            res.send(result);
        }
        
    })
});


/*
router.get('/get', function (req, res, next) {
    console.log('GET 호출 / data : ' + req.query.data);
    console.log('path : ' + req.path);
    res.send('get success')
});

router.post('/post', function (req, res, next) {
    console.log('POST 호출 / data : ' + req.body.data);
    console.log('path : ' + req.path);
    res.send('post success')
});

router.put('/put/:id', function (req, res, next) {
    console.log('UPDATE 호출 / id : ' + req.params.id);
    console.log('body : ' + req.body.data);
    console.log('path : ' + req.path);
    res.send('put success')
});

router.delete('/delete/:id', function (req, res, next) {
    console.log('DELETE 호출 / id : ' + req.params.id);
    console.log('path : ' + req.path);
    res.send('delete success')
});
*/

module.exports = router;