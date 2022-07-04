import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    roomId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
