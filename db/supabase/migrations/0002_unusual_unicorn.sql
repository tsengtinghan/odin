CREATE TABLE IF NOT EXISTS "images_table" (
	"image_id" serial PRIMARY KEY NOT NULL,
	"thread_id" integer NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images_table" ADD CONSTRAINT "images_table_thread_id_threads_table_thread_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."threads_table"("thread_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
