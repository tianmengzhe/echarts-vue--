const Koa = require('koa')
const app = new koa()


app.use((ctx, next)=>{

})

app.listen(3000,()=>console.log('服务器启动成功 http://localhost:3000'))