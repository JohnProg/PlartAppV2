const morgan = require('morgan');
const {
  bodyParser, create, defaults, router, rewriter,
} = require('json-server');

const expressServer = create();
const server = require('http').Server(expressServer);
const io = require('socket.io')(server);
const {
  loginUser,
  registerUser,
  verifyToken,
} = require('./auth');
const { saveSelectedProfessions, savePersonalInformation } = require('./common');
const { ip, port } = require('./config');

const apiEndpoints = router('db.json');
// Should be false on production
const middlewares = defaults({ logger: true });

// Own logging format
expressServer.use(morgan('combined', { colors: true }));
expressServer.use(bodyParser);
expressServer.use(middlewares);

expressServer.use(rewriter({
  '/api/*': '/$1',
}));

// Custom routes before JSON Server router
expressServer.post('/login', loginUser);
expressServer.post('/user/', registerUser);
expressServer.post('/api-token-verify/', verifyToken);
expressServer.put('/me/step_1/', saveSelectedProfessions);
expressServer.put('/me/step_2/', savePersonalInformation);

expressServer.use(apiEndpoints);

io.on('connection', (client) => {
  console.log('client connected', client.id);

  io.emit('review', { much: 'wow!' });

  client.on('getNotifications', (data) => {
    io.emit('newHotDeals', data);
  });
});

server.listen(port, ip, () => {
  console.log(`JSON Server is running on http://${ip}:${port}/`);
});
