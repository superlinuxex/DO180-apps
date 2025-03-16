const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const controller = require('./controllers/items');
const serverinfo = require('./controllers/serverinfo');

const db = require('./models/db');
const model = require('./models/items');

const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
});

model.connect(db.params, function(err) {
    if (err) throw err;
});

const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());

controller.context(server, '/todo/api', model);
serverinfo.context(server, '/todo/api');

const port = process.env.PORT || 30080;
server.listen(port, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('App is ready at : ' + port);
    }
});

if (process.env.environment === 'production') {
    process.on('uncaughtException', function(err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
    });
}
