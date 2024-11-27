import { boolean, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable('users', {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull(),
    isMember: boolean("is_member").default(false),
});

export const STUDY_MATERIAL_TABLE = pgTable('study_materials', {
    id: serial("id").primaryKey(),
    courseId: varchar("course_id").notNull(),
    courseType: varchar("course_type").notNull(),
    topic: varchar("topic").notNull(),
    difficultyLevel: varchar("difficulty_level").default("Easy"),
    courseLayout: json(),
    createdBy: varchar("created_by").notNull(),
    status: varchar("status").default("Generating"),
})

export const CHAPTER_NOTES_TABLE = pgTable('chapter_notes', {
    id: serial("id").primaryKey(),
    courseId: varchar("course_id").notNull(),
    chapterId: varchar("chapter_id").notNull(),
    notes:text(),
})