export default (express, bodyParser, createReadStream, crypto, http, m, UserSchema, writeFileSync) => {
    const app = express();

    const User = m.model('User', UserSchema);
    
    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers':'x-test,Content-Type,Accept, Access-Control-Allow-Headers'
        }; 
    

    app
    .use((r, res, next) => { r.res.set(CORS); next(); })
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/sha1/:input', r => {
        const shasum = crypto.createHash('sha1');
        shasum.update(r.params.input);
    
        r.res.send(shasum.digest('hex'));
    })
    
    .get('/login/', (req, res) => res.send('itmo287704'))
    .get('/code/', (req, res) => {
        res.set({'Content-Type': 'text/plain; charset=utf-8'});
        createReadStream(import.meta.url.substring(7)).pipe(res);
    })
    ;
    app.post('/insert/', async (req, res) => {
        const { URL, login, password } = req.body;
        try {
          await m.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (e) {
          res.send(e.stack);   
        }

        const newUser = new User({ login, password });
        await newUser.save();
        res.status(201).json({ successsss: true, login });
    }); 
    
    .post('/render/',async(req,res)=>{
            r.res.set(headersHTML);
            const {addr} = req.query;
            const {random2, random3} = req.body;
            
            http.get(addr,(r, b='') => {
                r
                    .on('data',d=>b+=d)
                    .on('end',()=>{
                        writeFileSync(path.replace('app.js','')+'views/index.pug', b);
                        res.render('index',{random2:random3})
                 })
            })
        })
    .use(({res:r})=>r.status(404).set(headersHTML).send('itmo287704'))
    
    app.all('/req/', (req, res) => {
        const addr = req.method === 'POST' ? req.body.addr : req.query.addr;

        http.get(addr, (r, b = '') => {
            r
            .on('data', d => b += d)
            .on('end', () => res.send(b));
        });
    })
    
    return app;
}
