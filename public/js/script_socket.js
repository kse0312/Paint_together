document.write("<script type='text/javascript' src='/socket.io/socket.io.js'><"+"/script>");

const chatLogs   = document.getElementById("chatLogs");
const subject    = document.getElementById("subject");
const party_numb = document.getElementById("party_numb");

const socket = io();
/** 로그인 메세지 수신 */
socket.on("login", function(data) {
});

/** 로그아웃 메세지 수신 */
socket.on("logout", function(data) {
});

/** 일반 채팅 메세지 수신 */
socket.on("chat", function(data) {
});

/** 채팅을 송신 */
function send(){
    console.log('send');
    return false;
}