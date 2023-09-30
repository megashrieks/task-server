CREATE TABLE IF NOT EXISTS "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"status" varchar DEFAULT 'OPEN' NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "task_date_index" ON "tasks" ("date","status");