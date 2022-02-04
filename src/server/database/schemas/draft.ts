import mongoose, { Schema } from "mongoose";


const DraftSchema = new mongoose.Schema(
  {
    name: {type: String, unique: true},
    menu: {type: Schema.Types.ObjectId, ref: 'menu'},
    content: {type: Schema.Types.ObjectId, ref: 'content'}
  },
  { timestamps: true, autoIndex: true }
);

export default mongoose.model("draft", DraftSchema);
