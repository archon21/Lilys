import { Draft } from "../schemas";

const DraftService = {
  GET: async ({ request, response }) => {
    const draftName = request?.params?.draftName;
    const draft = await Draft.findOne({ name: draftName });
    const ret = { draft: draft }
    return response?.send ?
      response.send(ret).status(200) 
      : ret
  },

//   POST: async ({ request, response }) => {
//     const { draftName } = request.body;
    
//     const itemsFromDb = await Content.find({});

//     if (!Boolean(`${page}` in itemsFromDb)) {
//       await Content.create({
//         name: page,
//         items: { [accessor]: items },
//       });
//     }

//     return response.send(items).status(200);
//   },
//   PATCH: async ({ request, response }) => {
//     const items = await Content.updateOne({
//       name: "pages",
//       items: request.body.items,
//     });
//     return response.send(items).status(200);
//   },

  DELETE: async ({ request, response }) => {
    return "HERE";
  },
};

export default DraftService;
