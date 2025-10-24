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
        .array(z.object({
        name: z.string(),
        role: z.string().optional(),
        avatar: z.string().url().optional(),
        social: z.string().optional(),
    }))
        .optional(),
    links: z
        .array(z.object({
        label: z.string(),
        url: z.string().url(),
    }))
        .optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
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
// API Response types
export const PaginatedResponseSchema = (schema) => z.object({
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
// Apply endpoint types
export const ApplyRequestSchema = ApplicationSchema.extend({
    csrfToken: z.string(),
});
export const ApplyResponseSchema = z.object({
    id: z.string(),
    message: z.string(),
});
//# sourceMappingURL=index.js.map