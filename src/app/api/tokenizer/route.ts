import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

const snap = new Midtrans.Snap({
    isProduction: false,    
    serverKey: process.env.MID_SERVER_KEY as string,
    // clientKey: process.env.MID_CLIENT_KEY
});
const params = {
    transaction_details: {
        order_id: "test-transaction-order-id",
        gross_amount: 10000,
    },
    credit_card: {
        secure: true,
    },
    customer_details: {
        first_name: "Test",
        last_name: "Test",
        email: "7zv2H@example.com",
        phone: "081122334455",
    },
}

export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    // const snap = new Midtrans.Snap({
    //     isProduction: false,
    //     serverKey: process.env.MIDTRANS_SERVER_KEY,
    //     clientKey: process.env.MIDTRANS_CLIENT_KEY,
    // });
    // const params = {
    //     transaction_details: {
    //         order_id: body.order_id,
    //         gross_amount: body.gross_amount,
    //     },
    //     credit_card: {
    //         secure: true,
    //     },
    //     customer_details: {
    //         first_name: body.first_name,
    //         last_name: body.last_name,
    //         email: body.email,
    //         phone: body.phone,
    //     },
    // };
    const token = (await snap.createTransaction(params)).token;
    return NextResponse.json(token);
}