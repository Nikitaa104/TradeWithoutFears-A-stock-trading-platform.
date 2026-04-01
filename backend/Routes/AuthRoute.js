
const { Signup, Login } = require('../controllers/AuthController')
const {userVerification} = require('../Middleware/AuthMiddleware')
const router = require('express').Router()

router.get("/verify", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }

  // optionally verify JWT here
  return res.json({ status: true });
});

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/verify',userVerification)

module.exports = router;
