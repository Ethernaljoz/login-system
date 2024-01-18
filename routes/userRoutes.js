const express = require('express')

const { getUsers, register, login } = require('../controllers/userControler.js')
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/',getUsers)




module.exports = router
























