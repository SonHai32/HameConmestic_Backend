import express from 'express'
import UserCtrl from '../Controller/users.controller.js'
const router = express.Router()

router.route('/add-user').post(UserCtrl.apiPushUser)

export default router