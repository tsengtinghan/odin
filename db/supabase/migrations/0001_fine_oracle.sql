ALTER TABLE "users_table" RENAME COLUMN "profile_picture" TO "display_name";--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "avatar_url" text;