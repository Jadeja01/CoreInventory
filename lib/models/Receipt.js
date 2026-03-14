import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema({

  receiptNumber: {
    type: String,
    required: true
  },

  supplier: String,

  warehouse: String,

  status: {
    type: String,
    enum: ["Draft", "Waiting", "Ready", "Done", "Canceled"],
    default: "Draft"
  },

  items: [
    {
      productId: String,
      quantity: Number
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.models.Receipt || mongoose.model("Receipt", ReceiptSchema);