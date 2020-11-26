export default (express, bodyParser, fs, crypto, http) => {
    const app = express();
    const CORS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT,OPTIONS",
    };

  
    app
      .use((r, res, next) => { r.res.set(CORS); next(); })
      .use(bodyParser.urlencoded({ extended: true }))
  
      .get('/login/', (req, res) => res.send('itmo287704')) 
    
    .post('/insert/', async (req, res) => {
        const { URL, login, password } = req.body;
        try {
          await m.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (e) {
          res.send(e.stack);   
        }

        const newUser = new User({ login, password });
        await newUser.save();
        res.status(201).json({ successsss: true, login });
    })

      .get('/sha1/:input', r => {
        const shasum = crypto.createHash('sha1');
        shasum.update(r.params.input);
    
        r.res.send(shasum.digest('hex'));
       })
  
      .get('/code/', (req, res) => {
        res.set({'Content-Type': 'text/plain; charset=utf-8'});
        fs.createReadStream(import.meta.url.substring(7)).pipe(res);
      })
  
      app.all('/req/', (req, res) => {
        const addr = req.method === 'POST' ? req.body.addr : req.query.addr;

        http.get(addr, (r, b = '') => {
            r
            .on('data', d => b += d)
            .on('end', () => res.send(b));
        });
      });
  
      return app;
};
