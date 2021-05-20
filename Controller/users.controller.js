import UserDAO from "../DAO/usersDAO.js";
export default class UserCtrl{
    static async apiPushUser(req, res, next){
        try {
            const userInfo = {
                username: req.query.username || req.body.username,
                password: req.query.password || req.body.password,
                phoneNumber: req.query.phoneNumber || req.body.phoneNumber,
                emailAddress: req.query.emailAddress || req.body.emailAddress
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
