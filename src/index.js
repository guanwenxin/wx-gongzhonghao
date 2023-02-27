const Koa = require('koa')

const KoaRouter = require('koa-router')
const { valid } = require('./services/valid-wx')
const xmlParser = require('koa-xml-body')
const app = new Koa();
const router = new KoaRouter()

app.use(xmlParser())
app.use(router.routes()).use(router.allowedMethods())
const {wxReplyFormat} = require('./utils/reply')
const {getAnswer} = require('./services/chat-qingyunke')

// 验证接口
router.get('/msg', (ctx) => {
    console.log(ctx.request.query)
    if (valid(ctx.request.query)) {
        ctx.body = ctx.request.query.echostr
    } else {
        ctx.body = ''
    }
})

// 接受微信的消息
router.post('/msg', async (ctx) => {
    const dataPayload = ctx.request.body.xml;
    const {ToUserName, FromUserName, Content} = dataPayload
    console.log(dataPayload)
    const ans = await getAnswer(Content[0])
    const resO = {
        ToUserName: FromUserName[0],
        FromUserName: ToUserName[0],
        CreateTime: new Date().getTime(),
        // Content: '我还在开发中',
        Content: ans,
        MsgType: 'text'
    }
    ctx.body = wxReplyFormat(resO)
})

app.listen(80, () => console.log('server is listening on http://localhost:80'))