import { mysqlTable, serial, varchar, text, datetime, int, boolean } from 'drizzle-orm/mysql-core';

export const templates = mysqlTable('templates', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  category: varchar('category', { length: 100 }).notNull(),
  description: text('description').notNull(),
  features: text('features'),
  image: varchar('image', { length: 500 }),
  demoUrl: varchar('demo_url', { length: 500 }),
  price: varchar('price', { length: 50 }),
  isPublished: boolean('is_published').default(true),
  createdAt: datetime('created_at').default(new Date()),
  updatedAt: datetime('updated_at').default(new Date()),
});

export const blogPosts = mysqlTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  coverImage: varchar('cover_image', { length: 500 }),
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  author: varchar('author', { length: 100 }).default('Admin'),
  isPublished: boolean('is_published').default(true),
  publishedAt: datetime('published_at').default(new Date()),
  createdAt: datetime('created_at').default(new Date()),
  updatedAt: datetime('updated_at').default(new Date()),
});

export const contacts = mysqlTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  templateId: int('template_id'),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  createdAt: datetime('created_at').default(new Date()),
});

export const admins = mysqlTable('admins', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: datetime('created_at').default(new Date()),
});
