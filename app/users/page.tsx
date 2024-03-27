import UserForm from '@/components/UserForm';
import prisma from '@/prisma/db';
import { getServerSession } from 'next-auth';
import React from 'react';
import options from '../api/auth/[...nextauth]/options';
import DataTableSimple from './data-table-simple';

const Users = async () => {
	const users = await prisma.user.findMany();
	const session = await getServerSession(options);
	if (session?.user.role !== 'ADMIN') {
		return <p className='text-destructive'>Admin access required</p>;
	}
	return (
		<div>
			<UserForm />
			<DataTableSimple users={users} />
		</div>
	);
};

export default Users;
