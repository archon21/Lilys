import { Menu } from "../schemas";

const MenuService = {
  GET: async ({ request, response }) => {
    const menus = await Menu.find();
    const ret = menus;

    return response?.send ? response.send(ret).status(200) : ret;
  },
  POST: async ({ request, response }) => {
    try {
      const { menus } = request.body;

      const [menu] = menus;

      const updatedMenu = await Menu.create(menu);

      return response.status(200).send();
    } catch (err) {
      console.error(err);
      return response.status(500).send();
    }
  },
  PATCH: async ({ request, response }) => {
    try {
      const { menus } = request.body;

      const [menu] = menus;
      const updatedMenu = await Menu.updateOne({ _id: menu._id }, menu);

      return response.status(200).send();
    } catch (err) {
      console.error(err);
      return response.status(500).send();
    }
  },
};

export default MenuService;
