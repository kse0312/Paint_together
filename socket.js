const mo = require('./module');
const rooms = require('./rooms');
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

module.exports = function (server) {

    // 이는 클라이언트가 /socket.io 경로 접근시 소켓 연결을 시작함을 의미
    const io = SocketIO(server);
    io.on("connection", function (socket) {
        // 클라이언트와 연결이 되면 연결된 사실을 출력합니다.
        console.log("["+mo.timestamp()+" "+socket.id+"] Socket Connection Succeeded...");

        socket.on('main_chat',function (data){
            console.log(data);
            io.to("main").emit('receive_chat', data)
        })

        socket.on('main_login',function (){
            socket.join('main');
        })

        socket.on('login',function (data){
            console.log(data);
            socket.room=data.number;
            socket.join(data.number);
            console.log(socket.room);
        })

        // 강제 종료 시 처리
        socket.on('force-disconnect', function () {
            socket.disconnect();
        })
        socket.on("disconnecting", () => {
            //console.log(Object.keys(self.rooms));

        });
        // socket 연결 종료
        socket.on("disconnect", reason => {
            if(socket.room!=null){
                let room = socket.room;
                console.log(room);
                if(socket.rooms.has(room)===false){
                    console.log(room+"번방의 인원 수가 0명입니다. 방을 삭제합니다.");
                    rooms.delete(room);
                }
            }
            // 클라이언트와 연결이 끊어지면 이유를 출력해줍니다.
            console.log("["+mo.timestamp()+" "+socket.id+"] disconnect: "+reason);
        })
    })


}