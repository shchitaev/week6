export default (express, bodyParser, fs, crypto, http) => {
    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE'};
    
    const app = express();
    const author = 'itmo287704'
    
  app
      .use((r, res, next) => { r.res.set(CORS); next(); })
      .use(bodyParser.urlencoded({ extended: true }))
  
      .get('/login/', (req, res) => res.send(author))  

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
