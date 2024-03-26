import { z } from 'zod';

export const ticketSchema = z.object({
	title: z.string().min(1, 'Title must be at least 1 character long').max(255),
	description: z
		.string()
		.min(1, 'Description must be at least 1 character long')
		.max(65535),
	status: z
		.string()
		.min(1, 'Status must be at least 1 character long')
		.optional(),
	priority: z
		.string()
		.min(1, 'Priority must be at least 1 character long')
		.max(10)
		.optional(),
});

export const ticketPatchSchema = z.object({
	title: z
		.string()
		.min(1, 'Title must be at least 1 character long')
		.max(255)
		.optional(),
	description: z
		.string()
		.min(1, 'Description must be at least 1 character long')
		.max(65535)
		.optional(),
	status: z
		.string()
		.min(1, 'Status must be at least 1 character long')
		.optional(),
	priority: z
		.string()
		.min(1, 'Priority must be at least 1 character long')
		.max(10)
		.optional(),
});
