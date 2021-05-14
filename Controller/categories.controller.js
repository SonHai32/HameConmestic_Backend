import CategoriesDAO from '../DAO/categoriesDAO.js'

export default class CategoriesCtrl{
    static async apiGetAllCategory(req, res, next){
        try {
           let categories = await CategoriesDAO.getAllCategories()
           
           res.json({categories})
        } catch (error) {
          res.json(error)  
        }
    }
}