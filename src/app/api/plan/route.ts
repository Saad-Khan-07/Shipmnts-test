import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function POST(req: NextRequest){

    try {
        const plan_id = randomUUID();
        const {store_location, valid_from, valid_to, items} =await req.json();

    if(!store_location){
        return NextResponse.json({success: "false", message: "provide a store with proper location."})
    }

    // const check = await prisma.store.findUnique({where: {store_location: store_location}})

    // if(check){
    //     return NextResponse.json({success: "false", message: "Store with this location already exists."})
    // }

    const plan = await prisma.plan.create({data: {
        location: store_location,
        valid_from: valid_from,
        valid_to: valid_to,
        category: items[0]["category"],
        name: items[0]["name"],
        half_price: items[0]["half_price"],
        full_price: items[0]["full_price"],
        extra_charge: items[0]["extra_charge"],
        plan_id: plan_id
    }})

    return NextResponse.json({success: "true", message: "plan created successfully", plan});

    } catch (error) {
        console.error(error)
        return NextResponse.json({success: "false", message: "could not enter plan."})
    }
}