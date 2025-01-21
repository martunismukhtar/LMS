import { NextApiRequest, NextApiResponse } from "next";
import Midtrans from "midtrans-client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const midtransClient = new Midtrans.Snap({
  isProduction: false, // Ubah ke `true` jika dalam mode produksi
  serverKey: process.env.MID_SERVER_KEY as string,
});

// export async function POST(req: Request, res: NextApiResponse) {
//     const notification = req.body;
//     const statusResponse = await midtransClient.createTransaction(notification);
//     const { order_id, transaction_status, fraud_status } = statusResponse;
//     // Log transaksi untuk debugging
//     console.log("Midtrans Notification:", statusResponse);
//     // Tangani status transaksi
//     if (transaction_status === "capture") {
//         if (fraud_status === "accept") {
//           // Pembayaran berhasil
//           await prisma.order.update({
//             where: { id: order_id },
//             data: { status: "SUCCESS" },
//           });
//           return res.status(200).json({ message: "Transaction successful" });
//         } else if (fraud_status === "challenge") {
//           // Transaksi butuh verifikasi manual
//           await prisma.order.update({
//             where: { id: order_id },
//             data: { status: "CHALLENGE" },
//           });
//           return res.status(200).json({ message: "Transaction under review" });
//         }
//       } else if (transaction_status === "settlement") {
//         // Pembayaran berhasil diselesaikan
//         await prisma.order.update({
//           where: { id: order_id },
//           data: { status: "SETTLEMENT" },
//         });
//         return res.status(200).json({ message: "Transaction settled" });
//       } else if (transaction_status === "pending") {
//         // Pembayaran belum selesai
//         await prisma.order.update({
//           where: { id: order_id },
//           data: { status: "PENDING" },
//         });
//         return res.status(200).json({ message: "Transaction pending" });
//       } else if (transaction_status === "deny") {
//         // Pembayaran ditolak
//         await prisma.order.update({
//           where: { id: order_id },
//           data: { status: "DENIED" },
//         });
//         return res.status(200).json({ message: "Transaction denied" });
//       } else if (transaction_status === "expire") {
//         // Pembayaran kedaluwarsa
//         await prisma.order.update({
//           where: { id: order_id },
//           data: { status: "EXPIRED" },
//         });
//         return res.status(200).json({ message: "Transaction expired" });
//       } else if (transaction_status === "cancel") {
//         // Pembayaran dibatalkan
//         await prisma.order.update({
//           where: { id: order_id },
//           data: { status: "CANCELLED" },
//         });
//         return res.status(200).json({ message: "Transaction cancelled" });
//       }

// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const notification = req.body;

//     // Verifikasi notifikasi ke Midtrans
//     const statusResponse = await midtransClient.transaction.notification(notification);

//     const { order_id, transaction_status, fraud_status } = statusResponse;

//     // Log transaksi untuk debugging
//     console.log("Midtrans Notification:", statusResponse);

//     // Tangani status transaksi
//     if (transaction_status === "capture") {
//       if (fraud_status === "accept") {
//         // Pembayaran berhasil
//         await prisma.order.update({
//           where: { id: order_id },
//           data: { status: "SUCCESS" },
//         });
//         return res.status(200).json({ message: "Transaction successful" });
//       } else if (fraud_status === "challenge") {
//         // Transaksi butuh verifikasi manual
//         await prisma.order.update({
//           where: { id: order_id },
//           data: { status: "CHALLENGE" },
//         });
//         return res.status(200).json({ message: "Transaction under review" });
//       }
//     } else if (transaction_status === "settlement") {
//       // Pembayaran berhasil diselesaikan
//       await prisma.order.update({
//         where: { id: order_id },
//         data: { status: "SETTLEMENT" },
//       });
//       return res.status(200).json({ message: "Transaction settled" });
//     } else if (transaction_status === "pending") {
//       // Pembayaran belum selesai
//       await prisma.order.update({
//         where: { id: order_id },
//         data: { status: "PENDING" },
//       });
//       return res.status(200).json({ message: "Transaction pending" });
//     } else if (transaction_status === "deny") {
//       // Pembayaran ditolak
//       await prisma.order.update({
//         where: { id: order_id },
//         data: { status: "DENIED" },
//       });
//       return res.status(200).json({ message: "Transaction denied" });
//     } else if (transaction_status === "expire") {
//       // Pembayaran kedaluwarsa
//       await prisma.order.update({
//         where: { id: order_id },
//         data: { status: "EXPIRED" },
//       });
//       return res.status(200).json({ message: "Transaction expired" });
//     } else if (transaction_status === "cancel") {
//       // Pembayaran dibatalkan
//       await prisma.order.update({
//         where: { id: order_id },
//         data: { status: "CANCELLED" },
//       });
//       return res.status(200).json({ message: "Transaction cancelled" });
//     }

//     return res.status(400).json({ message: "Invalid transaction status" });
//   } catch (error) {
//     console.error("Error handling Midtrans notification:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }
