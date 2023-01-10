let rooms = []
exports.show = function (){
    return rooms;
}
exports.make = function(info){
    if(rooms.length===0){
        rooms.push(info);
    }else if(rooms.indexOf(null)!==-1){
        let numb = rooms.indexOf(null);
        info.number=numb;
        rooms[numb]=info;
    }else{
        info.number=rooms.length;
        rooms.push(info)
    }
    console.log(rooms);
    return info;
}

exports.delete = function (number){
    rooms[number]=null;
}