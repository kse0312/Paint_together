
module.exports = function (app) {
    /** / 게시판으로 이동 */
    app.get('/', function(req, res){
        if(req.cookies.user_name){
            res.render('index.html',{
                user_name : req.cookies.user_name,
                user_img : req.cookies.user_img
            });
        }else{
            res.redirect('/make-character');
        }
    });

    /** /login 캐릭터 생성 데이터 입력 */
    app.post('/login',function(req, res){
        let user_name = req.body.f_user_name;
        let user_img  = req.body.f_img_0+'_'+req.body.f_img_1;
        res.cookie('user_name',user_name);
        res.cookie('user_img',user_img);
        res.redirect('/');
    });

    /** /make-character 캐릭터 생성 페이지 이동 */
    app.get('/make-character',function (req,res){
        res.render('login.html');
    });

    app.post('/canvas',function(req, res){
        let info = {
            subject : req.body.f_subject,
            text    : req.body.f_text,
            numb    : req.body.f_numb,
            onoff   : (req.body.f_onoff==='on')?'on':'off',
            pwd     : req.body.f_passwd
        };
        console.log(info);
        res.render('canvas.html',info);
    });

    app.get('/chat',function (req,res){
       res.render('chat.html');

    });

}