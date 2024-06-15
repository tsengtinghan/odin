import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
export const threadsTable = pgTable("threads_table", {
  thread_id: serial("thread_id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const postsTable = pgTable("posts_table", {
  post_id: serial("post_id").primaryKey(),
  thread_id: integer("thread_id")
    .notNull()
    .references(() => threadsTable.thread_id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const threadsRelations = relations(threadsTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const postsRelations = relations(postsTable, ({ one }) => ({
  thread: one(threadsTable, {
    fields: [postsTable.thread_id],
    references: [threadsTable.thread_id],
  }),
}));


export type InsertThread = typeof threadsTable.$inferInsert;
export type SelectThread = typeof threadsTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
