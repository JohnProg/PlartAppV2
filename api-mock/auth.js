/**
 * POST /login
 * Sign in using username and password.
 */
const loginUser = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123456') {
    res.json({ username, token: Date.now() });
  } else {
    res.sendStatus(401);
  }
};

/**
 * POST /user/
 * Process to register a user
 */
const registerUser = (req, res) => {
  const {
    username, password, email,
  } = req.body;
  const errorObj = {};
  if (!username) {
    errorObj.username = ['Este campo es requerido'];
  }
  if (!password) {
    errorObj.password = ['Este campo es requerido'];
  }
  if (!email) {
    errorObj.email = ['Este campo es requerido'];
  }
  if (Object.keys(errorObj).length > 0) {
    return res.status(401).json(errorObj);
  }
  return res.status(200).json({ token: Date.now() });
};

const verifyToken = (req, res) => res.status(200).json({ step_1: true, step_2: false });

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.verifyToken = verifyToken;
