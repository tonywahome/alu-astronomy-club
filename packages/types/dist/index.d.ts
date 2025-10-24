import { z } from "zod";
export declare const ProjectSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    summary: z.ZodString;
    description: z.ZodString;
    image: z.ZodString;
    gallery: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodEnum<["ongoing", "completed"]>;
    year: z.ZodNumber;
    type: z.ZodOptional<z.ZodEnum<["research", "event", "software", "other"]>>;
    tags: z.ZodArray<z.ZodString, "many">;
    team: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        role: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
        social: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        role?: string | undefined;
        avatar?: string | undefined;
        social?: string | undefined;
    }, {
        name: string;
        role?: string | undefined;
        avatar?: string | undefined;
        social?: string | undefined;
    }>, "many">>;
    links: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        label: string;
        url: string;
    }, {
        label: string;
        url: string;
    }>, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    summary: string;
    description: string;
    image: string;
    status: "ongoing" | "completed";
    year: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    type?: "research" | "event" | "software" | "other" | undefined;
    gallery?: string[] | undefined;
    team?: {
        name: string;
        role?: string | undefined;
        avatar?: string | undefined;
        social?: string | undefined;
    }[] | undefined;
    links?: {
        label: string;
        url: string;
    }[] | undefined;
}, {
    id: string;
    title: string;
    summary: string;
    description: string;
    image: string;
    status: "ongoing" | "completed";
    year: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    type?: "research" | "event" | "software" | "other" | undefined;
    gallery?: string[] | undefined;
    team?: {
        name: string;
        role?: string | undefined;
        avatar?: string | undefined;
        social?: string | undefined;
    }[] | undefined;
    links?: {
        label: string;
        url: string;
    }[] | undefined;
}>;
export type Project = z.infer<typeof ProjectSchema>;
export declare const InspirationMediaSchema: z.ZodObject<{
    id: z.ZodString;
    kind: z.ZodEnum<["image", "gif", "video"]>;
    src: z.ZodString;
    thumb: z.ZodOptional<z.ZodString>;
    caption: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    kind: "image" | "gif" | "video";
    src: string;
    thumb?: string | undefined;
    caption?: string | undefined;
    author?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
}, {
    id: string;
    createdAt: string;
    kind: "image" | "gif" | "video";
    src: string;
    thumb?: string | undefined;
    caption?: string | undefined;
    author?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
}>;
export type InspirationMedia = z.infer<typeof InspirationMediaSchema>;
export declare const ApplicationSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    reason: z.ZodString;
    skills: z.ZodOptional<z.ZodString>;
    consent: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    email: string;
    reason: string;
    consent: boolean;
    phone?: string | undefined;
    department?: string | undefined;
    skills?: string | undefined;
}, {
    fullName: string;
    email: string;
    reason: string;
    consent: boolean;
    phone?: string | undefined;
    department?: string | undefined;
    skills?: string | undefined;
}>;
export declare const ApplicationWithFileSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    reason: z.ZodString;
    skills: z.ZodOptional<z.ZodString>;
    consent: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
} & {
    cv: z.ZodOptional<z.ZodType<File, z.ZodTypeDef, File>>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    email: string;
    reason: string;
    consent: boolean;
    phone?: string | undefined;
    department?: string | undefined;
    skills?: string | undefined;
    cv?: File | undefined;
}, {
    fullName: string;
    email: string;
    reason: string;
    consent: boolean;
    phone?: string | undefined;
    department?: string | undefined;
    skills?: string | undefined;
    cv?: File | undefined;
}>;
export type Application = z.infer<typeof ApplicationSchema>;
export type ApplicationWithFile = z.infer<typeof ApplicationWithFileSchema>;
export declare const PaginatedResponseSchema: <T extends z.ZodTypeAny>(schema: T) => z.ZodObject<{
    items: z.ZodArray<T, "many">;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    items: T["_output"][];
    page: number;
    pageSize: number;
    total: number;
}, {
    items: T["_input"][];
    page: number;
    pageSize: number;
    total: number;
}>;
export declare const ErrorResponseSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    details?: Record<string, any> | undefined;
}, {
    code: string;
    message: string;
    details?: Record<string, any> | undefined;
}>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export declare const ApplyRequestSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    reason: z.ZodString;
    skills: z.ZodOptional<z.ZodString>;
    consent: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
} & {
    csrfToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    email: string;
    reason: string;
    consent: boolean;
    csrfToken: string;
    phone?: string | undefined;
    department?: string | undefined;
    skills?: string | undefined;
}, {
    fullName: string;
    email: string;
    reason: string;
    consent: boolean;
    csrfToken: string;
    phone?: string | undefined;
    department?: string | undefined;
    skills?: string | undefined;
}>;
export declare const ApplyResponseSchema: z.ZodObject<{
    id: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    message: string;
}, {
    id: string;
    message: string;
}>;
export type ApplyRequest = z.infer<typeof ApplyRequestSchema>;
export type ApplyResponse = z.infer<typeof ApplyResponseSchema>;
//# sourceMappingURL=index.d.ts.map