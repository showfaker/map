const Koa = require("koa"),
    Router = require("koa-router")(),
    bodyParser = require("koa-bodyparser"),
    cors = require('koa2-cors');
var index = require("./routes/admin");
var app = new Koa();

// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080'; // 这样就能只允许这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
//配置session 中间件
// app.keys = ['some secret hurr'];
// const CONFIG = {
//     key: 'koa-sess',
//     maxAge: 646000,
//     overwrite: true,
//     httpOnly: true,
//     signed: true,
//     rolling: true,  /*每次请求都会重新设置session*/
//     renew: false
// };
// app.use(session(CONFIG, app));
//配置中间件及静态资源库
app.use(bodyParser());
// app.use(static(__dirname + '/static'));
//配置模块
// render(app, {
//     root: path.join(__dirname, 'views'),
//     extname: '.html',
//     debug: process.env.NODE_ENV !== 'production',
//     dateFormat:dateFormat=function(value){return sd.format(value, 'YYYY-MM-DD HH:mm');} /*扩展模板里面的方法*/
// });
//启动路由
app.use(Router.routes()).use(Router.allowedMethods());
Router.use(index);
app.listen(3006, () => {
    console.log('node.js服务器启动');
});
