document.write("<script type='text/javascript' src='/socket.io/socket.io.js'><"+"/script>");
let msgForm;
let message;
let chatLogs;
let prof_name;
let socket;
window.onload=function () {
    msgForm   = document.getElementById('msgForm');
    message   = document.getElementById('message');
    chatLogs  = document.getElementById('chatLogs');
    prof_name = document.getElementById('prof_name');

    socket = io();

    /** main group에 socket 넣기 */
    socket.emit('main_login');

    msgForm.addEventListener('submit',function(event){
        event.preventDefault();
        send();
    });

    socket.on("receive_chat", function(data) {
        pushMessage(data);
    });

};



/** 채팅을 송신 */
function send(){
    console.log('send');
    socket.emit("main_chat", {
        name : prof_name.innerText
        , message : message.value
        , date : new Date().toUTCString()
    });
    message.value="";
}

function pushMessage(data) {
    const chatdiv = document.createElement('div')
    const node = document.createTextNode(`${data.name}: ${data.message}`)
    chatdiv.appendChild(node)
    chatLogs.appendChild(chatdiv)
    chatLogs.scrollTop = chatLogs.scrollHeight;
};
