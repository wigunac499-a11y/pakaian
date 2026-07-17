import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const templates = sqliteTable('templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  features: text('features'),
  image: text('image'),
  demoUrl: text('demo_url'),
  price: text('price'),
  isPublished: integer('is_published', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(new Date().toISOString()),
  updatedAt: text('updated_at').default(new Date().toISOString()),
});

export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  coverImage: text('cover_image'),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  author: text('author').default('Admin'),
  isPublished: integer('is_published', { mode: 'boolean' }).default(true),
  publishedAt: text('published_at').default(new Date().toISOString()),
  createdAt: text('created_at').default(new Date().toISOString()),
  updatedAt: text('updated_at').default(new Date().toISOString()),
});

export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  templateId: integer('template_id'),
  message: text('message').notNull(),
  isRead: integer('is_read', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(new Date().toISOString()),
});

export const admins = sqliteTable('admins', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').default('admin'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(new Date().toISOString()),
});

export const testimonials = sqliteTable('testimonials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  position: text('position'),
  company: text('company'),
  avatar: text('avatar'),
  content: text('content').notNull(),
  rating: integer('rating').default(5),
  isPublished: integer('is_published', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(new Date().toISOString()),
});

export const faqs = sqliteTable('faqs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: text('category').default('umum'),
  order: integer('order').default(0),
  isPublished: integer('is_published', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(new Date().toISOString()),
});

export const subscribers = sqliteTable('subscribers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(new Date().toISOString()),
});
