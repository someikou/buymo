var express = require('express'); //express框架模块
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块
var bodyParser = require('body-parser'); //对post请求的请求体进行解析模块
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //bodyParser.urlencoded 用来解析request中body的 urlencoded字符，只支持utf-8的编码的字符，也支持自动的解析gzip和 zlib。返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
var hostName = '127.0.0.1'; //ip
var port = 8888; //端口

//设置允许跨域请求
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//  主页输出 "Hello World"
app.get('/get*', function (req, res) {
   console.log(req.body); //获取请求参数

   var baseUrl = path.join(__dirname + "/mock");
   //var file = path.join(__dirname, 'data/test.json'); //文件路径，__dirname为当前运行js文件的目录
   var file = path.join(baseUrl + req.path+".json"); //也可以用这种方式指定路径
   console.log(file);
   //读取json文件
   fs.readFile(file, 'utf-8', function(err, data) {
       if (err) {
           res.send('文件读取失败');
       } else {
          console.log(data);
           res.send(JSON.stringify(data));
       }
   });
})

//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})
 
 
//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})
 
//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})
 
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})
 
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})