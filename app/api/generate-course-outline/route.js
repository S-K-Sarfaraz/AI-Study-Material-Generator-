
import { courseOutlineAIModel } from "@/configs/AIModels";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";


export async function POST(req) {

    const {courseId,topic,courseType,difficultyLevel,createdBy}= await req.json();

    const PROMPT = 'Generate a study material for '+topic+' for '+courseType+' and the level of difficulty will be '+difficultyLevel+' with summery of course, List of chapters, Topic list in each chapters in JSON format'

    console.log(PROMPT);
    // Generate Course Layout using AI
    const aiResp = await courseOutlineAIModel.sendMessage(PROMPT)

    const aiResult = JSON.parse(aiResp.response.text());

    // save the result with user input

    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId: courseId,
        courseType: courseType,
        createdBy: createdBy, 
        topic: topic,
        courseLayout: aiResult
    }).returning({resp:STUDY_MATERIAL_TABLE })

    console.log(dbResult);

    return NextResponse.json({result: dbResult[0]})
}