import UserDAO from "../DAO/usersDAO.js";
export default class UserCtrl{
    static async apiPushUser(req, res, next){
        try {
            const userInfo = {
                username: req.query.username,
                password: req.query.password,
                phoneNumber: req.query.phoneNumber,
                emailAddress: req.query.emailAddress
            }
           let result = await UserDAO.pushUser(userInfo) 
           res.json(result)
        } catch (error) {
           res.json(error)
           console.log(error) 
        }
    }

    static async apiLogin(req, res, next){
        try {
            const userLoginedInfo = await UserDAO.userLogin({username: req.query.username || req.body['username'], password: req.query.password || req.body['password']})
            res.json(userLoginedInfo)
        } catch (err) {
            res.json(err)   
        }
    }
}
