import { User } from "../schemas";
import user from "../schemas/user";

const Authentication = {
  GET: async ({ request, response, database }) => {
    database.READ({});
    return "HERE";
  },

  POST: async ({ request, response, database }) => {
    const { email, password } = request.body;
    // const user = await User.findOne({ email });
    const user = {};
    if (email === "emily@lilysbar.com" && password === "Paris1234@") {
     
        
      return response.status(200).send({ mode: "edit" });
    } else return response.status(403).send('Invalid Account')
     
    return user;
  },

  DELETE: async ({ request, response, database }) => {
    return "HERE";
  },
};

export default Authentication;
