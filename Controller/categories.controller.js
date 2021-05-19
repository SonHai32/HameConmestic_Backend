import CategoriesDAO from '../DAO/categoriesDAO.js'

export default class CategoriesCtrl{
    static async apiGetCategory(req, res, next){
        try {
           let categories = req.query['category_id'] ? await CategoriesDAO.searchCategory(req.query['category_id']) :  await CategoriesDAO.getAllCategories()
           res.json({categories})
        } catch (error) {
          res.json(error)  
        }
    }

}