const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const staticFiles = require('koa-static')
const multer = require('koa-multer');
const app = new Koa();
app.use(cors());
app.use(staticFiles(path.resolve(__dirname, "./uploads")))

const router = new Router();
// 存文件
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
const upload = multer({
    storage: storage
})
// 接口
router.get('/', async (ctx, next) => {
    ctx.body = `<h1>啥也没有</h1>`
  })
router.post('/upload', upload.single('file'), async (ctx, next) => {
    ctx.body = ctx.req.file.filename
})
app.use(router.routes(), router.allowedMethods())


const PORT = 323;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
