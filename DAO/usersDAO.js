import bcrypt from "bcrypt";

let USERS;

let ERROR_MESSAGE_TYPE = {
  usernameError: "INVALID USERNAME",
  passwordError: "INVALID PASSWORD",
  phoneError: "INVALID PHONE NUMBER",
  emailError: "INVALID EMAIL ADDRESS",
};

export default class UserDAO {
  static async injectDB(myConnection) {
    try {
      if (USERS) {
        return;
      } else {
        USERS = await myConnection.db(process.env.DB_NAME).collection("users");
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async pushUser(userInfo) {
    try {
      let user = await this.findUser(userInfo.username);
      if (user.length <= 0) {
        let errors = this.checkValid(userInfo);
        if (errors.length === 0) {
          const passwordHash = new Promise((reslove, reject) => {
            bcrypt.hash(userInfo.password, 10, async (err, hash) => {
              if (!err) {
                reslove(hash);
              } else {
                reject(err);
              }
            });
          });

          return passwordHash.then(async (passwordHash) => {
            let result = await USERS.insert({
              ...userInfo,
              password: passwordHash,
            });
            return result;
          });
        } else {
          return {
            success: false,
            message: "create Fail: " + errors.toString(),
            ...userInfo,
          };
        }
      }else{
          return {
            success: false,
            message: "create Fail: USER EXISTED",
            ...userInfo,
          };
      }
    } catch (err) {
      return {
        success: false,
        message: "create Fail: " + err.toString(),
        ...userInfo,
      };
    }
  }

  static async findUser(username) {
    try {
      const user = await USERS.find({ username: username });
      return user.toArray();
    } catch (error) {
      console.log(error);
    }
  }
  static checkValid(userInfo) {
    let errors = [];
    if (
      userInfo.username === "" ||
      userInfo.username.length < 4 ||
      userInfo.username.length >= 20 ||
      userInfo.username === undefined
    ) {
      errors.push(ERROR_MESSAGE_TYPE.usernameError);
    }
    if (
      userInfo.password === "" ||
      userInfo.password.length < 6 ||
      userInfo.password === undefined
    ) {
      errors.push(ERROR_MESSAGE_TYPE.passwordError);
    }
    if (
      userInfo.phoneNumber === "" ||
      userInfo.phoneNumber.length < 6 ||
      userInfo.phoneNumber.length > 11 ||
      userInfo.phoneNumber === undefined
    ) {
      errors.push(ERROR_MESSAGE_TYPE.phoneError);
    }
    if (
      userInfo.emailAddress === "" ||
      userInfo.emailAddress.length < 4 ||
      userInfo.emailAddress.length > 50 ||
      userInfo.emailAddress === undefined
    ) {
      errors.push(ERROR_MESSAGE_TYPE.emailError);
    }
    return errors;
  }
}
