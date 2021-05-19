import express from 'express'
import CategoriesCtrl from '../Controller/categories.controller.js'

const router = express.Router()

router.route('/')
    .get(CategoriesCtrl.apiGetCategory)

export default router