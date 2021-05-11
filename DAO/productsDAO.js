let products

export default class ProductsDAO{
    static async injectDB(myConnection){
        if(products){
            return
        }
        try{
            products = await myConnection.db(process.env.DB_NAME).collection('products')
        }catch(err){
            console.error(`Khon the lay du lieu products: ${err}`)
        }
    }

    static async getProducts({
        filter = null,
        page = 0,
        productsPerPage = 12,
    } = {}){
        let mongodbQuery
        if(filter){
            if('product_name' in filter){
                mongodbQuery = {$text: {$search: filter['product_name']}}
            }else if("product_cat" in filter){
                mongodbQuery = {$or: [{"product_cat.cat_id": filter['product_cat']}, {"product_cat.parent_cat.cat_id": filter['product_cat']}]}
            }
        }
    }
}