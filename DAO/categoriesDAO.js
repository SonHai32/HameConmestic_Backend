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
        let cursor
        try{
            cursor = categories.find({})
        }catch(err){
        }

        return cursor.toArray();
    }
}