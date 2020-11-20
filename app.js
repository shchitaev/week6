export default (express, bodyParser, fs, crypto, http) => {
    const app = express();
    const author = 'itmo287704'
 app
    .get('/login/', (req, res) => res.send(author))
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .all('*', (req, res) => res.send(author));

    return app;
}
