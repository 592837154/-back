const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const multer = require('koa-multer');
const app = new Koa();
app.use(cors());
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
router.post('/upload', upload.single('file'), async (ctx, next) => {
    ctx.body = {
        filename: ctx.req.file.filename//返回文件名
    }
})
app.use(router.routes(), router.allowedMethods())


const PORT = 323;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
