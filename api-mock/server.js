const {
  bodyParser, create, defaults, router, rewriter,
} = require('json-server');
const morgan = require('morgan');
const socket = require('socket.io');
const app = require('http').createServer(create());
const {
  loginUser,
  registerUser,
  verifyToken,
} = require('./auth');
const { saveSelectedProfessions, savePersonalInformation } = require('./common');
const { ip, port } = require('./config');

const io = socket(app);
const server = create();
const apiEndpoints = router('db.json');
// Should be false on production
const middlewares = defaults({ logger: true });

// Own logging format
server.use(morgan('combined', { colors: true }));
server.use(bodyParser);
server.use(middlewares);

server.use(rewriter({
  '/api/*': '/$1',
}));

// Custom routes before JSON Server router
server.post('/login', loginUser);
server.post('/user/', registerUser);
server.post('/api-token-verify/', verifyToken);
server.put('/me/step_1/', saveSelectedProfessions);
server.put('/me/step_2/', savePersonalInformation);

server.use(apiEndpoints);

io.on('connection', (client) => {
  console.log('client connected', client.id);

  io.emit('review', { much: 'wow!' });

  client.on('getNotifications', (data) => {
    io.emit('newHotDeals', data);
  });
});

app.listen(3001, ip, () => {
  console.log(`Socket on http://${ip}:3001/`);
});

server.listen(port, ip, () => {
  console.log(`JSON Server is running on http://${ip}:${port}/`);
});
