const Koa = require("koa"),
    Router = require("koa-router")(),
    bodyParser = require("koa-bodyparser"),
    cors = require('koa2-cors');
var index = require("./routes/admin");
var app = new Koa();    //koa框架实例化

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
//配置中间件及静态资源库
app.use(bodyParser());

//启动路由
app.use(Router.routes()).use(Router.allowedMethods());
Router.use(index);
app.listen(3006, () => {
    console.log('node.js服务器启动');
});
