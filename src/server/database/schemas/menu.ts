import mongoose, { Types } from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    displayName: { type: String },
    sections: [
      {
        name: { type: String },
        description: { type: String },
        items: [
          {
            name: { type: String },
            price: [{ priceType: { type: String }, amount: { type: Number } }],
            description: { type: String },
            unit: { type: String },

            options: [
              {
                name: { type: String },
                price: [
                  { priceType: { type: String }, amount: { type: Number } },
                ],
                type: { type: String },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true, autoIndex: true }
);

export default mongoose.model("menu", MenuSchema);
