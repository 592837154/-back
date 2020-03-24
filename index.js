const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const staticFiles = require('koa-static')
const multer = require('koa-multer');
const fs = require('fs');
const data = [];
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
        const filename = Date.now() + "." + fileFormat[fileFormat.length - 1];
        fs.readFile('./uploads/data.json', 'utf8', function (err, data) {
            console.log('err');
            if (err) {
                console.log('err', 2)
            }
            console.log('123', 33, data)
            let result = [];
            if (data) {
                preResult = JSON.parse(data);
                result = [...preResult];
            }
            result.push({
                ...req.body,
                filename
            });
            fs.writeFile('./uploads/data.json', JSON.stringify(result), (err) => {
                if (err) {
                    console.log('err');
                }
            })
        });

        cb(null, filename);
    }
});
const upload = multer({
    storage: storage
})
// 接口
router.get('/data', async (ctx, next) => {
    const data = fs.readFileSync('./uploads/data.json', 'utf-8');
    console.log(data);
    let result = [];
    if (data) {
        result = data;
    }
    ctx.body = result

})
router.post('/upload', upload.single('file'), async (ctx, next) => {
    console.log(ctx.req.body);
    ctx.body = data
})

app.use(router.routes(), router.allowedMethods())


const PORT = 323;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
