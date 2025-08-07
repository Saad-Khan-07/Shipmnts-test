import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { Location } from "@/generated/prisma";

const prisma = new PrismaClient();

// enum Location{
//     "AHMEDABAD",
//   "MUMBAI",
//   "DELHI"
// }

export async function PUT(req: NextRequest, {params}: {params: {store_location: Location}}){
    
    try {
        
        const {currency, tax_percentage, premium_items} =await req.json();
        const {store_location} = params;

        const store_info = prisma.store.update({where: {store_location}, data: {tax_percentage: tax_percentage}, select: {tax_percentage} });
        return NextResponse.json({success: "true", message: "Store Updated Successfully", store_info})    
    } catch (error) {
        console.error(error)
        return NextResponse.json({success: "false", message: "could not update store"});
    }
    
}