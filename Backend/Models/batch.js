const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchSchema = new Schema(
  {
    year: { type: Number, required: true, unique: true },
    campus: { type: Schema.Types.ObjectId, ref: "Campus", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", batchSchema);
