import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest){
    
    try {
        const {store_location, currency, tax_percentage, premium_items} =await req.json();

    if(!store_location){
        return NextResponse.json({success: "false", message: "provide a store with proper location."})
    }

    const float_percentage = parseFloat(tax_percentage);

    const check = await prisma.store.findUnique({where: {store_location: store_location}})

    if(check){
        return NextResponse.json({success: "false", message: "Store with this location already exists."})
    }

    const store = await prisma.store.create({data: {
        store_location: store_location,
        currency: currency,
        tax_percentage: float_percentage,
        premium_items: premium_items
    }})

    return NextResponse.json({success: "true", message: "store created successfully", store});

    } catch (error) {
        console.error(error)
        return NextResponse.json({success: "false", message: "could not enter store."})
    }
}