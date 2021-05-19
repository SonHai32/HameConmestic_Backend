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
           console.log(result)
        } catch (error) {
           res.json(error)
           console.log(error) 
        }
    }
}
