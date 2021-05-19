let categories
export default class CategoriesDAO{


    static async injectDB(myConnection){
        if(categories){
            return
        }else{
            categories = await myConnection.db(process.env.DB_NAME).collection('categories')
        }
    }

    static async getAllCategories(){
        try{
            let cursor = await categories.find({})
            return cursor.toArray()
        }catch(err){
            console.log(err);
        }

    }
    
    static async searchCategory(categoryID){
        try{
            let cursor = await categories.find({$or: [{'cat_id': categoryID}, {'cat_child.cat_id': categoryID}]})
            return cursor.toArray()
        }catch(err){
            console.log(err);
        }

    }
}