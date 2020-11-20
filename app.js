export default (express, bodyParser, fs, crypto, http) => {
    const app = express();
    const author = 'itmo287704'
    


res.setHeader('X-Author', author)
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    
    app
    .get('/login/', (req, res) => res.send(author))
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res));
    //
    return app;
}
