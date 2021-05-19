import express from 'express'
import UserCtrl from '../Controller/users.controller.js'
const router = express.Router()

router.route('/add-user').post(UserCtrl.apiPushUser)
router.route('/login').post(UserCtrl.apiLogin)

export default router