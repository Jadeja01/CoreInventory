import connectDB from "@/lib/mongodb";
import Receipt from "@/lib/models/Receipt";
import Delivery from "@/lib/models/Delivery";
import Transfer from "@/lib/models/Transfer";

export async function GET(req) {

  await connectDB();

  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const warehouse = searchParams.get("warehouse");


    // Build query        

  const baseQuery = {};

  if (status && status !== "All Status") {
    baseQuery.status = status;
  }

  if (warehouse && warehouse !== "All Warehouses") {
    baseQuery.warehouse = warehouse;
  }


//  Fetch data   

  let receipts = [];
  let deliveries = [];
  let transfers = [];

  if (!type || type === "All Types" || type === "Receipt") {
    receipts = await Receipt.find(baseQuery)
      .sort({ createdAt: -1 })
      .limit(10);
  }

  if (!type || type === "All Types" || type === "Delivery") {
    deliveries = await Delivery.find(baseQuery)
      .sort({ createdAt: -1 })
      .limit(10);
  }

  if (!type || type === "All Types" || type === "Transfer") {
    transfers = await Transfer.find(baseQuery)
      .sort({ createdAt: -1 })
      .limit(10);
  }

 
//    Normalize operations format  

  const receiptOps = receipts.map((r) => ({
    type: "Receipt",
    document: r.receiptNumber,
    warehouse: r.warehouse,
    status: r.status,
    date: r.createdAt,
  }));

  const deliveryOps = deliveries.map((d) => ({
    type: "Delivery",
    document: d.deliveryNumber,
    warehouse: d.warehouse,
    status: d.status,
    date: d.createdAt,
  }));

  const transferOps = transfers.map((t) => ({
    type: "Transfer",
    document: t.transferNumber,
    warehouse: `${t.fromWarehouse} → ${t.toWarehouse}`,
    status: t.status,
    date: t.createdAt,
  }));

//   Merge operations

  const operations = [
    ...receiptOps,
    ...deliveryOps,
    ...transferOps
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return Response.json(operations);
}