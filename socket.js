const mo = require('./module');
const SocketIO = require("socket.io");
const req = require("express/lib/request");

// let userrooms=[{
//     room_id : string,   //방 번호
//     matr_id : string,   //마스터 ID
//     matr_na : string,   //마스터 NAME
//     room_na : string,   //방 이름
//     room_pw : string,   //방 PASSWD
//     room_max: int,      //최대 인원 수
//     room_cur: int       //현재 인원 수
//     group   : []        //참가자 id
// }]
let rooms=[];
module.exports = function (server) {

    // 이는 클라이언트가 /socket.io 경로 접근시 소켓 연결을 시작함을 의미
    const io = SocketIO(server);
    io.on("connection", function (socket) {
        // 클라이언트와 연결이 되면 연결된 사실을 출력합니다.
        console.log("["+mo.timestamp()+" "+socket.id+"] Socket Connection Succeeded...");

        socket.on('login',function (){

        })
        socket.on('join',function (){

        })
        // 강제 종료 시 처리
        socket.on('force-disconnect', function () {
            socket.disconnect();
        })
        // socket 연결 종료
        socket.on("disconnect", reason => {
            // 클라이언트와 연결이 끊어지면 이유를 출력해줍니다.
            console.log("["+mo.timestamp()+" "+socket.id+"] disconnect: "+reason);
            console.log()
        })
    })


}