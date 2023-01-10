/* Express 기본 모듈 불러오기 */
const express   = require('express');
const http      = require('http');
const cookie    = require('cookie-parser');
/* 모듈 연결 */
const database = require('./dbconnect');
const request  = require('./server');
const socket   = require('./socket');
const rooms    = require('./rooms');
const mo       = require('./module');
/* express 객체 생성 */
const app  = express();
const port = 8080;
/* express http 서버 생성 */
const server = http.createServer(app);

//서버 on
server.listen(port, () => {
    console.log("["+mo.timestamp()+"] Server Started....... ");
});

const logger = function(req, res, next){
    console.log("["+mo.timestamp()+" "+req.ip+"] "+req.originalUrl);
    next();
};

app.set("port", port);
//ejs(embedded javascript template) node.js에서 사용하는 템플릿 뷰 엔진이다.
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(cookie());
app.use(logger);
// json 형태로 body 데이터를 파싱 body-parser
app.use(express.json());
// 파싱할때의 옵션 {false: 기본으로 내장된 querystring 모듈 사용, true : 설치가 필요한 qs 모듈을 사용하여 쿼리 스트링을 해석}
app.use(express.urlencoded({ extended: false }));

socket(server);
request(app,port);
