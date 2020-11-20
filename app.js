export default (express, bodyParser, fs, crypto, http) => {
    const author = 'itmo287704'
    const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE', 'X-Author': 'author'}
    const app = express();
    app

    .get('/login/', (req, res) => res.send(author))
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .all('*', (req, res) => {res.send(author), res.setHeader(CORS)});
    //
    return app;
}
