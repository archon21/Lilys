import Util from "../..";
import defaultErrorHandler from "./defaultErrorHandler";

class User {
  static async login({ email, password }) {
    try {
      const userResponseData = await Util.Request({
        method: "POST",
        url: "/api/authentication",
        data: { email, password },
      });
      return userResponseData;
    } catch (err) {
      return defaultErrorHandler({ err });
    }
  }

  static async logout() {
    try {
      const userResponseData = await Util.Request({
        method: "DELETE",
        url: "/api/authentication",
      });
      return userResponseData;
    } catch (err) {
      return defaultErrorHandler({ err });
    }
  }

  static async getUser() {
    try {
      const userResponseData = await Util.Request({
        method: "POST",
        url: "/api/user",
        // data: { email, password },
      });
      return userResponseData;
    } catch (err) {
      return defaultErrorHandler({ err });
    }
  }
}

export default User;
