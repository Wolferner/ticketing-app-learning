import options from '@/app/api/auth/[...nextauth]/options';
import UserForm from '@/components/UserForm';
import prisma from '@/prisma/db';
import { getServerSession } from 'next-auth';
import React from 'react';

interface Props {
	params: { id: string };
}
const EditUser = async ({ params }: Props) => {
	const session = await getServerSession(options);
	if (session?.user.role !== 'ADMIN') {
		return <p className='text-destructive'>Admin access required</p>;
	}

	const user = await prisma?.user.findUnique({
		where: {
			id: parseInt(params.id),
		},
		select: {
			id: true,
			name: true,
			username: true,
			role: true,
		},
	});

	if (!user) {
		return <p className='text-destructive'>User not found</p>;
	}
	//because i dont want push password to client but in types its exist
	const userCopy = { ...user, password: '' };
	return <UserForm user={userCopy} />;
};

export default EditUser;
