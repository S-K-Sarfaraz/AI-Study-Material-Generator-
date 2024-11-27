import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { GenerateNotesAIModel } from "@/configs/AIModels";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;

    const result = await step.run(
      "Check User and Create New if not in DB",
      async () => {
        // check the user is already exist or not

        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        console.log(result);
        if (result?.length == 0) {
          // if Not, Then add the user ot DB
          const userResp = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });
            return userResp;
          }
          return result;
        }
    );

    return "Success";
  }
  //   step is to Send Welcome Email Notification

  //   step to Send Email notification after 3 days once user joined
);

export const GenerateNotes = inngest.createFunction(
  {id: "generate-notes"},
  {event: "notes.generate"},
  async ({event, step}) => {
   const {course} = event.data; // All the information of the course
   
   // Generate Notes for Each Chapter with AI
    const noteResult = await step.run('Generate Chapter Notes', async () => {
      const Chapters= course?.courseLayout?.chapters;
      let index =0;
      Chapters.forEach( async(chapter)=>{
        const PROMPT = 'Generate exam material detail content for each chapter, Make sure to include all the topic point in the content make sure to give content in HTML format (do not Add HTML, Head, Body, Title tag) The chapter:'+JSON.stringify(chapter);
        const result = await GenerateNotesAIModel.sendMessage(PROMPT)
        const aiResp = result.response.text()

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiResp
        })
        index= index+1;
      })
      return "Completed"
    })

    // Update Status to "Ready"
    const updateCourseReadyResult = await step.run('Update Course Status to Ready', async()=>{
      const result = await db.update(STUDY_MATERIAL_TABLE).set({
        status: 'Ready'
      }).where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId))
      return 'Success'
    })

  }
)