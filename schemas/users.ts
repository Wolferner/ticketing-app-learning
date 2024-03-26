import { z } from 'zod';

export const userSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long').max(255),
	userName: z
		.string()
		.min(3, 'Username must be at least 3 characters long')
		.max(255),
	password: z
		.string()
		.min(6, 'Password must be at least 8 characters long')
		.max(255)
		.optional()
		.or(z.literal('')),
	role: z.string().min(3, 'Role must be at least 3 characters long').max(10),
});
