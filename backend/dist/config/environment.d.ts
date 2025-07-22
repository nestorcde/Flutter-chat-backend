import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    PORT: z.ZodDefault<z.ZodString>;
    DB_CON: z.ZodString;
    JWT_KEY: z.ZodString;
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
}, "strip", z.ZodTypeAny, {
    PORT: string;
    DB_CON: string;
    JWT_KEY: string;
    NODE_ENV: "development" | "production" | "test";
}, {
    DB_CON: string;
    JWT_KEY: string;
    PORT?: string | undefined;
    NODE_ENV?: "development" | "production" | "test" | undefined;
}>;
export declare const validateEnv: () => {
    PORT: string;
    DB_CON: string;
    JWT_KEY: string;
    NODE_ENV: "development" | "production" | "test";
};
export type Environment = z.infer<typeof envSchema>;
export {};
//# sourceMappingURL=environment.d.ts.map