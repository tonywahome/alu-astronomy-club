import { z } from "zod";

// Project type
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  image: z.string().url(),
  gallery: z.array(z.string().url()).optional(),
  status: z.enum(["ongoing", "completed"]),
  year: z.number().int().min(2000).max(2100),
  type: z.enum(["research", "event", "software", "other"]).optional(),
  tags: z.array(z.string()),
  team: z
    .array(
      z.object({
        name: z.string(),
        role: z.string().optional(),
        avatar: z.string().url().optional(),
        social: z.string().optional(),
      })
    )
    .optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    )
    .optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Project = z.infer<typeof ProjectSchema>;

// Inspiration Media type
export const InspirationMediaSchema = z.object({
  id: z.string(),
  kind: z.enum(["image", "gif", "video"]),
  src: z.string().url(),
  thumb: z.string().url().optional(),
  caption: z.string().optional(),
  author: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  createdAt: z.string().datetime(),
});

export type InspirationMedia = z.infer<typeof InspirationMediaSchema>;

// Member Application type
export const ApplicationSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  department: z.string().optional(),
  reason: z.string().min(10).max(1000),
  skills: z.string().max(500).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to proceed",
  }),
});

export const ApplicationWithFileSchema = ApplicationSchema.extend({
  cv: z.instanceof(File).optional(),
});

export type Application = z.infer<typeof ApplicationSchema>;
export type ApplicationWithFile = z.infer<typeof ApplicationWithFileSchema>;

// API Response types
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    items: z.array(schema),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
    total: z.number().int().nonnegative(),
  });

export const ErrorResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.any()).optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// Apply endpoint types
export const ApplyRequestSchema = ApplicationSchema.extend({
  csrfToken: z.string(),
});

export const ApplyResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
});

export type ApplyRequest = z.infer<typeof ApplyRequestSchema>;
export type ApplyResponse = z.infer<typeof ApplyResponseSchema>;
