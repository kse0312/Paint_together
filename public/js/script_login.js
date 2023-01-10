let img_0;
let img_1;
let temp = "";
function Bef_btn(x){
    img_0 = document.getElementById('f_img_0');
    img_1 = document.getElementById('f_img_1');
    if(x===0){
        temp=Number(img_0.value)-1;
        if(temp===-1){
            img_0.value=3;
        }else{
            img_0.value=temp;
        }
    }else{
        temp=Number(img_1.value)-1;
        if(temp===-1){
            img_1.value=9;
        }else{
            img_1.value=temp;
        }
    }
    SetImg();
}
function Aft_btn(x){
    img_0 = document.getElementById('f_img_0');
    img_1 = document.getElementById('f_img_1');
    if(x===0){
        temp=Number(img_0.value)+1;
        if(temp===3){
            img_0.value=0;
        }else{
            img_0.value=temp;
        }
    }else{
        temp=Number(img_1.value)+1;
        if(temp===10){
            img_1.value=0;
        }else{
            img_1.value=temp;
        }
    }
    SetImg();
}
function SetImg(){
    temp="/img/character/"+img_0.value+"_"+img_1.value+".png";
    document.getElementById("char_img").src= temp;
}