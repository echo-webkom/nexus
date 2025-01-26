import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { users } from "./users";

export const showcases = pgTable("showcase", {
  id: text("id").notNull().primaryKey().$defaultFn(nanoid),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  imageUrl: text("image_url"),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
  publishedAt: timestamp("published_at"),
  deletedAt: timestamp("deleted_at"),
});

export const showcasesRelations = relations(showcases, ({ one }) => ({
  user: one(users, {
    fields: [showcases.userId],
    references: [users.id],
  }),
}));

export type Showcase = InferSelectModel<typeof showcases>;
export type ShowcaseInsert = InferInsertModel<typeof showcases>;

export const selectShowcaseSchema = createSelectSchema(showcases);
export const insertShowcaseSchema = createInsertSchema(showcases);
