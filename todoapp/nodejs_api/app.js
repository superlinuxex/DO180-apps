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

model.connect(db.params, (err) => {
  if (err) throw err;
});

const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

controller.context(server, '/todo/api', model);
serverinfo.context(server, '/todo/api');

const port = process.env.PORT || 30080;
server.listen(port, () => {
  console.log(`App is ready at: ${port}`);
});

if (process.env.environment === 'production') {
  process.on('uncaughtException', (err) => {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
  });
}

