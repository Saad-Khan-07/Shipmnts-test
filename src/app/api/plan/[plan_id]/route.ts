import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { Location } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, {params}: {params: {plan_id: Location}}){
    
    try {
        const {plan_id} =await params;

        const plan_info = prisma.plan.findFirst({where: {plan_id: plan_id}});
        return NextResponse.json({success: "true", message: "PLan info retained successfully.", plan_info})    
    } catch (error) {
        console.error(error)
        return NextResponse.json({success: "false", message: "could not get plan info"});
    }
    
}