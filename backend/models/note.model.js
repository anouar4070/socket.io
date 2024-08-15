import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
  },
  {timestamps: true}
);

export const NoteModel = mongoose.model("note", noteSchema);