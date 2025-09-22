CREATE TABLE "user_orgs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"org_id" integer NOT NULL,
	"role" varchar(30) DEFAULT 'member' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_domain_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_org_id_orgs_id_fk";
--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "org_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "donations" ALTER COLUMN "org_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "org_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "job_posts" ALTER COLUMN "org_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orgs" ADD COLUMN "type" varchar(30) DEFAULT 'college';--> statement-breakpoint
ALTER TABLE "orgs" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "user_orgs" ADD CONSTRAINT "user_orgs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_orgs" ADD CONSTRAINT "user_orgs_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "capacity";--> statement-breakpoint
ALTER TABLE "job_posts" DROP COLUMN "expires_at";--> statement-breakpoint
ALTER TABLE "orgs" DROP COLUMN "domain";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "org_id";