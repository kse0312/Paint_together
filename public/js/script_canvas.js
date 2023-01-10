let canvas ;
let ctx    ;
let cursor ;
let color  ;
let palette;
let size   ;
let shape  ;
let ctmclr ;
window.onload=function(){          //페이지 로딩 완료 시
    palette_init();
    /*
        - onmouseXXX 로 시작
        1. onmouseover : 해당 객체의 영역위에 커서가 진입하는 순간
        2. onmouseout  : 해당 영역에서 커서가 빠져나가는 순간
        3. onmousedown : 해당 객체의 영역에서 마우스 버튼이 눌려지는 순간
        4. onmouseup   : 해당 객체의 영역에서 마우스 버튼이 떼는 순간
        5. onmousemove : 해당 객체의 영여겡서 커서가 움직이는 순간
    */
    canvas  = document.getElementById('myCanvas');
    ctx     = canvas.getContext('2d');
    cursor  = document.querySelector(".cursor");
    color   = document.getElementById("color");
    palette = document.getElementById("palette");
    size    = document.getElementById('size_pen');
    ctmclr  = 0;

    canvas.onmousedown  = draw.start;
    canvas.onmousemove  = draw.move;
    canvas.onmouseup    = draw.end;
    canvas.onmouseout   = draw.leave;
    canvas.onmouseover  = draw.enter;

    document.getElementById('pen').onclick     = op.pen;
    document.getElementById('erase').onclick   = op.erase;
    document.getElementById('paint').onclick   = op.paint;
    document.getElementById('clear').onclick   = op.clear;
    document.getElementById('palette').onclick = op.color;
    document.getElementById('fill').onclick    = op.fill;
    //canvas 설정
    ctx.strokeStyle = "#000000";    //펜 색상
    ctx.lineWidth   = 10;            //펜 굵기
    ctx.lineCap     = "round";      //선 끝점 모양 {butt,round,square}
    ctx.lineJoin    = "round";      //선 연결 모양 {round,bevel,miter} 기본->miter

    cursor.classList.remove("cursor");

    palette.addEventListener("change",function(e){
        shape.color=this.value;
        color.value=this.value;
        shape_change();
        document.getElementById('used'+ctmclr).style.background=this.value;
        if(ctmclr<6){ctmclr+=1}
        else{ctmclr=0}
    });
}
shape = {
    color : '#000000',
    width : 10,
    e_wid : 15,
    fill  : false,
    type  : 'pen'
};


function handle_Cursor(e) {
    cursor.style.top = (e.pageY)+ "px"
    cursor.style.left = (e.pageX) + "px"
}

function hide_Cursor() {
    cursor.classList.remove("cursor")
}



let draw = {
    drawing : null,
    enter:function(e){
        cursor.classList.add("cursor");
        handle_Cursor(e);
    },
    leave:function(e){
        hide_Cursor();
        ctx.closePath();
        this.drawing = false;
    },
    start:function(e){
        var x=e.offsetX;
        var y=e.offsetY;
        ctx.save()
        switch(shape.type){
            case "paint":
                ctx.fillRect(0,0,canvas.width,canvas.height);
                break;
            case 'fill':
                this.drawing = true;
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x,y);
                ctx.stroke();
                break;
            default:
                this.drawing = true;
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x,y);
                ctx.stroke();
                break;
        }
    },
    move:function(e){
        var x=e.offsetX;
        var y=e.offsetY;

        handle_Cursor(e);
        if(this.drawing){
            switch(shape.type){
                default:
                    ctx.lineTo(x,y);
                    ctx.stroke();
                    break;
            }
        }

    },
    end:function(e){
        if(this.drawing){
            switch(shape.type){
                case 'fill':
                    ctx.fill();
                    ctx.closePath();
                    this.drawing = false;
                    break;
                default:
                    ctx.closePath();
                    this.drawing = false;
            }
        }

    }
}

let op={
    pen:function(e){
        document.getElementById("n_op").value="p";
        shape.type="pen";
        size.value=shape.width;
        size_change();
    },
    erase:function(e){
        document.getElementById("n_op").value="e";
        shape.type="erase";
        size.value=shape.e_wid;
        size_change();
    },
    paint:function(e){
        document.getElementById("n_op").value="P";
        shape.type="paint";
        shape_change();
    },
    clear:function(e){
        ctx.clearRect(0,0, canvas.width, canvas.height)
        console.log('clear!');
    },
    color:function(e){
        shape.color=palette.value;
        shape_change();
    },
    fill:function (e){
        document.getElementById("n_op").value="F";
        shape.type="fill";
        size.value=shape.width;
    }
}
let chatlog = document.getElementById('chatLogs');
let msgForm = document.getElementById('msgForm');
let message = document.getElementById('message');

message.onsubmit((e)=> {
    e.preventDefault();
    chatlog.append("<div>"+"test: "+msgForm.val()+"</div>");
    // 서버로 메시지를 전송한다.
    //socket.emit("chat", { name: name, msg: $msgForm.val() });
    msgForm.val("");
    chatlog.scrollTop(chatlog[0].scrollHeight);
});

function size_change(){
    //펜 사이즈 변경
    let s=size.value;
    document.getElementById('size_result').value=s;

    if(shape.type==="erase"){
        shape.e_wid=s;
    }else{
        shape.width=s;

    }
    ctx.lineWidth=s;

    shape_change();

    //커서 사이즈 변경
    cursor.style.width=(s-4)*0.1+"rem";
    cursor.style.height=(s-4)*0.1+"rem";
}

function shape_change(){
    switch(shape.type){
        case "erase":
            ctx.globalCompositeOperation="destination-out";
            break;
        case "pen":
        case "paint":
        default:
            ctx.globalCompositeOperation="source-over";
            cursor.style.borderRadius="50%";
            ctx.fillStyle = shape.color;
            ctx.strokeStyle = shape.color;
            ctx.lineCap="round";
            ctx.lineJoin="round";
            break;
    }
}

function colorSet(target){    //컬러박스 색상으로 변경
    shape.color   = target.id;
    palette.value = target.id;
    shape_change();
}
function rgbToHex ( rgbType ){
    /*
    ** 컬러값과 쉼표만 남기고 삭제하기.
    ** 쉼표(,)를 기준으로 분리해서, 배열에 담기.
    */
    var rgb = rgbType.replace( /[^%,.\d]/g, "" ).split( "," );

    rgb.forEach(function (str, x, arr){

        /* 컬러값이 "%"일 경우, 변환하기. */
        if ( str.indexOf( "%" ) > -1 ) str = Math.round( parseFloat(str) * 2.55 );

        /* 16진수 문자로 변환하기. */
        str = parseInt( str, 10 ).toString( 16 );
        if ( str.length === 1 ) str = "0" + str;

        arr[ x ] = str;
    });

    return "#" + rgb.join( "" );
}
function usedcolorSet(target){
    let temp = rgbToHex(target.style.backgroundColor);
    shape.color   = temp
    color.value = temp
    palette.value = temp
    shape_change();
}
function palette_init(){
    //2차원 배열 파레트 데이터
    var bw=["#000000","#747474","#8C8C8C","#A6A6A6","#D5D5D5","#EAEAEA","#FFFFFF"];
    var pallet = [["#FF0000","#FFBB00", "#FFFF36", "#ABF200", "#0054FF", "#5F00FF", "#FF00DD"],
        ["#F15F5F","#FFE18F", "#FFF612", "#BCE55C", "#6799FF", "#A566FF", "#F361DC"],
        ["#FFA7A7","#FFE08C", "#FAED7D", "#CEF279", "#B2CCFF", "#D1B2FF", "#FFB2F5"]];

    var tag = "";

    for(i=0;i<bw.length;i++){
        tag += "<button id='"+bw[i]+"' class='colorBox' onclick='colorSet(this)' style='background-color:"+bw[i]+"'>&nbsp</button>";
    }tag +="</br>";

    for(i=0; i<pallet.length; i++){
        for(j=0; j<pallet[i].length; j++){
            tag += "<button id='"+pallet[i][j]+"' class='colorBox' onclick='colorSet(this)' style='background-color:"+pallet[i][j]+"'>&nbsp</button>";
        }
        tag+="</br>";
    }

    for(i=0;i<bw.length;i++){
        tag += "<button id='used"+i+"' class='colorBox' onclick='usedcolorSet(this)' style='background-color:#FFFFFF'>&nbsp</button>";
    }tag +="</br>";
    //파레트 파싱
    document.getElementById("paletteBox").innerHTML = tag;
}