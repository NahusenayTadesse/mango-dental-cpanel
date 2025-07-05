import { mysqlTable, varchar, boolean, datetime, int, float, date, text, time  } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const user = mysqlTable('users', {
  id: varchar('id', { length: 191 }).primaryKey(), 
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: varchar('image', { length: 2048 }), // optional, so no .notNull()
  createdAt: datetime('createdAt').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updatedAt').notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
  first_name: varchar('first_name', { length: 25 }),
  last_name: varchar('last_name', { length: 25 }),
  role_id: int('role_id').references(() => role.id),
  profile_picture_url: varchar('profile_picture_url', { length: 255 }),
  is_active: boolean('is_active').notNull().default(true),
  branch_id: int('branch_id').references(() => branch.id),
  created_at: datetime('created_at').notNull(),
  updated_at: datetime('updated_at').notNull()
});

export const session = mysqlTable('sessions', {
  id: varchar('id', { length: 191 }).primaryKey(),
  userId: varchar('userId', { length: 191 }).notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).notNull(),
  expiresAt: datetime('expiresAt').notNull(),
  ipAddress: varchar('ipAddress', { length: 45 }), // supports IPv6, nullable
  userAgent: varchar('userAgent', { length: 1024 }), // nullable, typically long
  createdAt: datetime('createdAt').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updatedAt').notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const account = mysqlTable('accounts', {
  id: varchar('id', { length: 191 }).primaryKey(),

  userId: varchar('userId', { length: 191 }).notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  accountId: varchar('accountId', { length: 255 }).notNull(),
  providerId: varchar('providerId', { length: 255 }).notNull(),

  accessToken: varchar('accessToken', { length: 2048 }),
  refreshToken: varchar('refreshToken', { length: 2048 }),

  accessTokenExpiresAt: datetime('accessTokenExpiresAt'),
  refreshTokenExpiresAt: datetime('refreshTokenExpiresAt'),

  scope: varchar('scope', { length: 1024 }),
  idToken: varchar('idToken', { length: 2048 }),
  password: varchar('password', { length: 255 }),

  createdAt: datetime('createdAt').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updatedAt').notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const verification = mysqlTable('verifications', {
  id: varchar('id', { length: 191 }).primaryKey(),
  
  identifier: varchar('identifier', { length: 255 }).notNull(),
  value: varchar('value', { length: 1024 }).notNull(),

  expiresAt: datetime('expiresAt').notNull(),

  createdAt: datetime('createdAt').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updatedAt').notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const role = mysqlTable('role', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description')
});

export const branch = mysqlTable('branch', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address'),
  phone: varchar('phone', { length: 20 }),
  created_at: datetime('created_at').notNull()
});

export const patient = mysqlTable('patient', {
  id: int('id').primaryKey().autoincrement(),
  first_name: varchar('first_name', { length: 25 }).notNull(),
  last_name: varchar('last_name', { length: 25 }).notNull(),
  date_of_birth: date('date_of_birth'),
  phone: varchar('phone', { length: 20 }),
  gender: varchar('gender', { length: 50 }),
  email: varchar('email', { length: 255 }),
  address: text('address'),
  emergency_contact_name: varchar('emergency_contact_name', { length: 255 }),
  emergency_contact_phone: varchar('emergency_contact_phone', { length: 20 }),
  insurance_provider: varchar('insurance_provider', { length: 255 }),
  insurance_number: varchar('insurance_number', { length: 255 }),
  created_at: datetime('created_at').notNull()
});

export const specialty = mysqlTable('specialty', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description')
});

export const appointment = mysqlTable('appointment', {
  id: int('id').primaryKey().autoincrement(),
  patient_id: int('patient_id').notNull().references(() => patient.id),
  doctor_id: varchar('doctor_id', { length: 255 }).notNull().references(() => user.id),
  date: date('date').notNull(),
  time: time('time').notNull(),
  reason: text('reason'),
  status: varchar('status', { length: 50 }),
  duration: int('duration'),
  notes: text('notes')
});

export const treatment = mysqlTable('treatment', {
  id: int('id').primaryKey().autoincrement(),
  appointment_id: int('appointment_id').notNull().references(() => appointment.id),
  description: text('description').notNull(),
  cost: float('cost'),
  date: date('date').notNull(),
  tooth_number: varchar('tooth_number', { length: 10 }),
  treatment_type: varchar('treatment_type', { length: 255 })
});

export const prescription = mysqlTable('prescription', {
  id: int('id').primaryKey().autoincrement(),
  patient_id: int('patient_id').notNull().references(() => patient.id),
  doctor_id: varchar('doctor_id', { length: 255 }).notNull().references(() => user.id),
  medication: text('medication').notNull(),
  dosage: text('dosage').notNull(),
  instructions: text('instructions'),
  issued_at: datetime('issued_at').notNull()
});

export const invoice = mysqlTable('invoice', {
  id: int('id').primaryKey().autoincrement(),
  patient_id: int('patient_id').notNull().references(() => patient.id),
  treatment_id: int('treatment_id').notNull().references(() => treatment.id),
  amount: float('amount').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  issued_at: datetime('issued_at').notNull()
});

export const payment = mysqlTable('payment', {
  id: int('id').primaryKey().autoincrement(),
  invoice_id: int('invoice_id').notNull().references(() => invoice.id),
  method: varchar('method', { length: 50 }).notNull(), // e.g., cash, card, insurance
  amount: float('amount').notNull(),
  paid_at: datetime('paid_at').notNull()
});

export const permission = mysqlTable('permission', {
  id: int('id').primaryKey().autoincrement(),
  user_id: varchar('user_id', { length: 255 }).notNull().references(() => user.id),
  resource_type: varchar('resource_type', { length: 255 }).notNull(),
  resource_id: varchar('resource_id', { length: 255 }).notNull(),
  can_edit: boolean('can_edit').notNull().default(false),
  can_view: boolean('can_view').notNull().default(true),
  is_locked: boolean('is_locked').notNull().default(false)
});

export const role_permission = mysqlTable('role_permission', {
  id: int('id').primaryKey().autoincrement(),
  role_id: int('role_id').notNull().references(() => role.id),
  resource_type: varchar('resource_type', { length: 255 }).notNull(),
  can_edit: boolean('can_edit').notNull().default(false),
  can_view: boolean('can_view').notNull().default(true),
  can_delete: boolean('can_delete').notNull().default(false),
  can_create: boolean('can_create').notNull().default(false)
});

export const inventory = mysqlTable('inventory', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  quantity: int('quantity').notNull(),
  unit: varchar('unit', { length: 50 }),
  cost: float('cost'),
  branch_id: int('branch_id').references(() => branch.id),
  updated_at: datetime('updated_at').notNull()
});

export const audit_log = mysqlTable('audit_log', {
  id: int('id').primaryKey().autoincrement(),
  user_id: varchar('user_id', { length: 255 }).references(() => user.id),
  action: varchar('action', { length: 255 }).notNull(),
  target_type: varchar('target_type', { length: 255 }),
  target_id: varchar('target_id', { length: 255 }),
  created_at: datetime('created_at').notNull()
});

export const medical_record = mysqlTable('medical_record', {
  id: int('id').primaryKey().autoincrement(),
  patient_id: int('patient_id').notNull().references(() => patient.id),
  record: text('record').notNull(),
  created_by: varchar('created_by', { length: 255 }).references(() => user.id),
  created_at: datetime('created_at').notNull()
});


export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Verification = typeof verification.$inferSelect;
export type Role = typeof role.$inferSelect;
export type Branch = typeof branch.$inferSelect;
export type Patient = typeof patient.$inferSelect;
export type Specialty = typeof specialty.$inferSelect;
export type Appointment = typeof appointment.$inferSelect;
export type Treatment = typeof treatment.$inferSelect;
export type Prescription = typeof prescription.$inferSelect;
export type Invoice = typeof invoice.$inferSelect;
export type Payment = typeof payment.$inferSelect;
export type Permission = typeof permission.$inferSelect;
export type RolePermission = typeof role_permission.$inferSelect;
export type Inventory = typeof inventory.$inferSelect;
export type AuditLog = typeof audit_log.$inferSelect;
export type MedicalRecord = typeof medical_record.$inferSelect;