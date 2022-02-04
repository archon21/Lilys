import { Content } from "../schemas";

const ContentService = {
  GET: async ({ request, response }) => {
    const page = request?.params?.page;


    // const content = await Content.findOne({ name: page });
    const content = {}
  

    return response?.send
      ? response.send({ [content.name]: content?.items }).status(200)
      : { [content.name]: content?.items };
  },

  POST: async ({ request, response }) => {
    const { page, accessor, items } = request.body;

    const itemsFromDb = await Content.find({});

    if (!Boolean(`${page}` in itemsFromDb)) {
      await Content.create({
        name: page,
        items: { [accessor]: items },
      });
    }

    return response.send(items).status(200);
  },
  PATCH: async ({ request, response }) => {
    const items = await Content.updateOne({
      name: "pages",
      items: request.body.items,
    });
    return response.send(items).status(200);
  },

  DELETE: async ({ request, response }) => {
    return "HERE";
  },
};

export default ContentService;
