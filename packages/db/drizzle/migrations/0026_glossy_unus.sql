CREATE TABLE IF NOT EXISTS "showcase" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"url" text NOT NULL,
	"image_url" text,
	"user_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	"published_at" timestamp,
	"deleted_at" timestamp
);
