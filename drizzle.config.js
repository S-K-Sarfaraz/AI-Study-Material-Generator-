import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url: 'postgresql://ai-images-editing-app_owner:pSuoqcYr1f3k@ep-icy-tree-a5hfin1n.us-east-2.aws.neon.tech/ai-learning-platform?sslmode=require'
  }
});
