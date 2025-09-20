import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

/* -------------------------------
  Users (all signups via Clerk)
-------------------------------- */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id", { length: 64 }).notNull().unique(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  role: varchar("role", { length: 20 }).notNull().default("student"), // student | alumni | admin
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------------------
  Organizations (Colleges / Alumni Batches)
-------------------------------- */
export const orgs = pgTable("orgs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  type: varchar("type", { length: 30 }).default("college"), // "college" | "batch"
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------------------
  User-Org Memberships (roles)
-------------------------------- */
export const userOrgs = pgTable("user_orgs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id),
  role: varchar("role", { length: 30 }).notNull().default("member"),
  // member = student, alumni = verified graduate, event_manager, admin
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------------------
  Alumni Profiles (extra info)
-------------------------------- */
export const alumniProfiles = pgTable("alumni_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  graduationYear: integer("graduation_year"),
  branch: varchar("branch", { length: 100 }),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  location: varchar("location", { length: 150 }),
  skills: json("skills"), // ["Java", "ML", "Design"]
  socialLinks: json("social_links"), // { linkedin, twitter }
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------------------
  Events
-------------------------------- */
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"), // from ImageKit
  location: varchar("location", { length: 200 }),
  startsAt: timestamp("starts_at").notNull(),
  endsAt: timestamp("ends_at"),
  createdBy: integer("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------------------
  Event RSVPs
-------------------------------- */
export const eventRsvps = pgTable("event_rsvps", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  status: varchar("status", { length: 20 }).default("attending"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------------------
  Blog Posts
-------------------------------- */
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  createdBy: integer("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------------------
  Job Posts
-------------------------------- */
export const jobPosts = pgTable("job_posts", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id),
  title: varchar("title", { length: 200 }).notNull(),
  company: varchar("company", { length: 150 }).notNull(),
  location: varchar("location", { length: 150 }),
  description: text("description").notNull(),
  postedBy: integer("posted_by")
    .notNull()
    .references(() => users.id),
  applyUrl: text("apply_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------------------
  Job Applications
-------------------------------- */
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobPosts.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  resumeUrl: text("resume_url"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------------------
  Donations
-------------------------------- */
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 10 }).default("INR"),
  donorId: integer("donor_id").references(() => users.id),
  donorName: varchar("donor_name", { length: 150 }),
  stripeChargeId: varchar("stripe_charge_id", { length: 150 }),
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------------------
  Alumni Applications
-------------------------------- */
export const alumniApplications = pgTable("alumni_applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id),
  graduationYear: integer("graduation_year"),
  branch: varchar("branch", { length: 100 }),
  proofUrl: text("proof_url"), // link to proof doc/image in ImageKit
  status: varchar("status", { length: 20 }).default("pending"), // pending | approved | rejected
  createdAt: timestamp("created_at").defaultNow(),
});
