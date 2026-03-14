import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Receipt from "@/lib/models/Receipt";
import Delivery from "@/lib/models/Delivery";
import Transfer from "@/lib/models/Transfer";

export async function GET() {

  await connectDB();

  // Total products
  const totalProducts = await Product.countDocuments();

  // Low stock
  const lowStock = await Product.countDocuments({
    $expr: { $lte: ["$quantity", "$minStock"] },
    quantity: { $gt: 0 }
  });

  // Out of stock
  const outOfStock = await Product.countDocuments({
    quantity: 0
  });

  // Pending receipts
  const pendingReceipts = await Receipt.countDocuments({
    status: { $in: ["Draft", "Waiting", "Ready"] }
  });

  // Pending deliveries
  const pendingDeliveries = await Delivery.countDocuments({
    status: { $in: ["Draft", "Waiting", "Ready"] }
  });

  // Scheduled transfers
  const scheduledTransfers = await Transfer.countDocuments({
    status: "Waiting"
  });

  return Response.json({
    totalProducts,
    lowStock,
    outOfStock,
    pendingReceipts,
    pendingDeliveries,
    scheduledTransfers
  });

}