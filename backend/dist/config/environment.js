"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default('3000'),
    DB_CON: zod_1.z.string().min(1, 'Database connection string is required'),
    JWT_KEY: zod_1.z.string().min(1, 'JWT key is required'),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
});
const validateEnv = () => {
    try {
        return envSchema.parse(process.env);
    }
    catch (error) {
        console.error('Environment validation failed:', error);
        process.exit(1);
    }
};
exports.validateEnv = validateEnv;
//# sourceMappingURL=environment.js.map