CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"description" text NOT NULL,
	"website" text NOT NULL,
	"industry" text NOT NULL,
	"size" text NOT NULL,
	"headquarters" text NOT NULL,
	"founded" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"company_id" integer NOT NULL,
	"location" text NOT NULL,
	"type" text NOT NULL,
	"description" text NOT NULL,
	"requirements" text NOT NULL,
	"responsibilities" text NOT NULL,
	"salary" text NOT NULL,
	"benefits" text NOT NULL,
	"application_url" text NOT NULL,
	"experience" text NOT NULL,
	"department" text NOT NULL,
	"remote" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;