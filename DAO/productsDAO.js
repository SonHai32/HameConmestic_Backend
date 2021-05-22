import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId
let products

export default class ProductsDAO {
    static async injectDB(myConnection) {
        if (products) {
            return
        }
        try {
            products = await myConnection.db(process.env.DB_NAME).collection('data2')
        } catch (err) {
            console.error(`Khon the lay du lieu products: ${err}`)
        }
    }

    static async getProducts({
        filter = null,
        page = 0,
        productsPerPage = 12,
    } = {}) {
        let mongodbQuery
        if (filter) {
            if ('product_name' in filter) {
                mongodbQuery = { $text: { $search: filter['product_name'] } }
            } else if ("product_cat" in filter) {
                mongodbQuery = { $or: [{ "product_cat.cat_id": filter['product_cat'] }, { "product_cat.parent_cat.cat_id": filter['product_cat'] }] }
            } else if ("product_price" in filter) {
                mongodbQuery = { "product_price": { $eq: filter['product_price'] } }
            } else if ('id' in filter) {
                mongodbQuery = { "_id": new ObjectId(filter['id']) }
            }

        }

        let cursor

        try {
            cursor = await products.find(mongodbQuery)
        } catch (err) {
            console.error(`error: ${err}`)
            return { product_list: [], totalNumProducts: 0 }
        }

        const display_cursor = cursor.limit(productsPerPage).skip(page * productsPerPage)

        try {
            const productsList = await display_cursor.toArray()
            const totalNumProducts = await products.countDocuments(mongodbQuery)

            return { productsList, totalNumProducts }
        } catch (err) {
            console.error(`Khong the chuyen doi cursor sang array hoac loi dem so luong san pham: ${err}`)
            return { product_list: [], totalNumProducts: 0 }
        }
    }

    static async addProduct(productSchema) {
        try {
            if (productSchema['productName'] && productSchema['productPrice'] && productSchema['productImages'] && productSchema['productCat'] ) {
                const product = {
                    'product_name': productSchema['productName'],
                    'product_price': productSchema['productPrice'],
                    'product_img_urls': productSchema['productImages'],
                    'product_old_price': productSchema['productOldPrice'] ? productSchema['productOldPrice']: productSchema['productPrice'],
                    'product_discount': productSchema['productDiscount'] ? productSchema['ProductDiscount'] : '0%',
                    'product_rating': productSchema['productRating'] ? parseFloat(productSchema['productRating']): 0,
                    'product_cat': productSchema['productCat'],
                    'product_colors': productSchema['productColors'] ?  productSchema['productColors']: []
                }
                return await product.insertOne(product)
            } else {
                return
            }
        } catch (error) {
            return {error}
        }
    }
}