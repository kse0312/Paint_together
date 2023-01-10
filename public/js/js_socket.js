document.write("<script type='text/javascript' src='/socket.io/socket.io.js'><"+"/script>");

let chatLogs;
let subject;
let party_numb;
let number;
let socket;

window.onload=function (){
    chatLogs   = document.getElementById("chatLogs");
    subject    = document.getElementById("subject");
    party_numb = document.getElementById("party_numb");
    number     = document.getElementById('room_numb');
    socket = io();

    socket.emit("login",{
        number : number.value
    })

    /** 로그인 메세지 수신 */
    socket.on("receive_login", function(data) {
    });

    /** 로그아웃 메세지 수신 */
    socket.on("receive_login", function(data) {
    });

    /** 일반 채팅 메세지 수신 */
    socket.on("receive_chat", function(data) {
    });

}




/** 채팅을 송신 */
function send(){
    console.log('send');
    return false;
}