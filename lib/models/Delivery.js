import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({

  deliveryNumber: {
    type: String,
    required: true
  },

  customer: String,

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

export default mongoose.models.Delivery || mongoose.model("Delivery", DeliverySchema);