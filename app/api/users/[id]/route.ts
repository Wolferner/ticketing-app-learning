import prisma from '@/prisma/db';
import { userSchema } from '@/schemas/user';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
	params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
	const body = await request.json();
	const validation = userSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}

	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!user) {
		return NextResponse.json({ error: 'User not found' }, { status: 404 });
	}

	//Check existing of password to hash it or not to rewrite it, because when comes empty string its mean that user dont change it
	if (body?.password && body.password !== '') {
		const hashPassword = await bcrypt.hash(body.password, 10);
		body.password = hashPassword;
	} else {
		delete body.password;
	}

	if (user.username !== body.username) {
		const duplicateUsername = await prisma.user.findUnique({
			where: { username: body.username },
		});

		if (duplicateUsername) {
			return NextResponse.json({ message: 'Duplicate user' }, { status: 409 });
		}
	}

	const updateUser = await prisma.user.update({
		where: {
			id: parseInt(params.id),
		},
		data: { ...body },
	});

	return NextResponse.json(updateUser);
}
