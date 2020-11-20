export default (express, bodyParser, fs, crypto, http) => {
    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE'};
    
    const app = express();
    const author = 'itmo287704'
 app
    .use((r, res, next) => { r.res.set(CORS); next(); })
    .get('/login/', (req, res) => res.send(author))
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .all('*', (req, res) => res.send(author));
    
    return app;
}
