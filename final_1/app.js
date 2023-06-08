// index.js

const express = require('express');
const app = express();
const users = []; // 개인정보
const Customer = require('./app/models/customer.model.js');
const path = require('path'); 

app.use(express.json()); // JSON parse 미들웨어 추가

app.get('/', function(req, res){
    //return res.send('hello world');
    Customer.getAll((result) => {
        res.render('index',{data: result});
    });
});

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 
app.engine('ejs', require('ejs').__express);

app.get('/user', function (req, res) {
    // 첫번째 인자 req: 
    //클라이언트에서 요청이올 때, ReqBody, ReqHeader, url 등등 그런 정보들이 모두 들어있다.
    
    // 두번째 인자 res: 
    // 클라이언트에 응답할 때 필요한 모든 정보들이 들어있다. 지금부터 저희가 작성할 내용 외에도 기본적으로 
    // 들어가야되는 네트워크 정보라던지 그런 것들이 모두 여기 들어있다.
    return res.send({ users: users }); 
})

app.post('/user',function(req, res){
    //console.log(req.body);
    users.push({ name: req.body.name, age: req.body.age })

    //users.push({ name: 'LeeDabean', age: 25 })
        
    // post 요청 성공시 success를 반환  
    return res.send({success: true});
})

require("./app/routes/customer.routes.js")(app);
app.listen(8090, function () {
    console.log('8090포트로 연결중 입니다.');
})