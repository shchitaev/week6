export default (express, bodyParser, fs, crypto, http) => {
    const app = express();

    app
    .get('/login/', (req, res) => res.send('itmo287704'))
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res));
    //
    return app;
}
