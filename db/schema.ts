import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users_table", {
  user_id: serial("user_id").primaryKey(),
  username: text("username").notNull(),
  display_name: text("display_name"),
  avatar_url: text("avatar_url"),
  bio: text("bio"),
  prompt: text("prompt"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const threadsTable = pgTable("threads_table", {
  thread_id: serial("thread_id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.user_id, { onDelete: "cascade" }),
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
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.user_id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const imagesTable = pgTable("images_table", {
  image_id: serial("image_id").primaryKey(),
  thread_id: integer("thread_id")
    .notNull()
    .references(() => threadsTable.thread_id, { onDelete: "cascade" }),
  image_url: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  threads: many(threadsTable),
  posts: many(postsTable),
}));

export const threadsRelations = relations(threadsTable, ({ many, one }) => ({
  posts: many(postsTable),
  user: one(usersTable, {
    fields: [threadsTable.user_id],
    references: [usersTable.user_id],
  }),
  images: many(imagesTable),
}));

export const postsRelations = relations(postsTable, ({ one }) => ({
  thread: one(threadsTable, {
    fields: [postsTable.thread_id],
    references: [threadsTable.thread_id],
  }),
  user: one(usersTable, {
    fields: [postsTable.user_id],
    references: [usersTable.user_id],
  }),
}));

export const imagesRelatins = relations(imagesTable, ({ one }) => ({
  threads: one(threadsTable, {
    fields: [imagesTable.thread_id],
    references: [threadsTable.thread_id],
  }),
}));

export type InsertThread = typeof threadsTable.$inferInsert;
export type SelectThread = typeof threadsTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
