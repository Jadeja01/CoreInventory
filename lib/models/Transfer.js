import mongoose from "mongoose";

const TransferSchema = new mongoose.Schema({

  transferNumber: {
    type: String,
    required: true
  },

  fromWarehouse: String,

  toWarehouse: String,

  status: {
    type: String,
    enum: ["Draft", "Waiting", "Ready", "Done", "Canceled"],
    default: "Waiting"
  },

  scheduledDate: Date,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.models.Transfer || mongoose.model("Transfer", TransferSchema);