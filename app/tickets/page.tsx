import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { buttonVariants } from '@/components/ui/button';
import prisma from '@/prisma/db';
import { Status } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import DataTable from './DataTable';

interface SearchParams {
	page: string;
	status: Status;
}
interface Props {
	searchParams: SearchParams;
}
const Tickets = async ({ searchParams }: Props) => {
	const pageSize = 10;
	const page = parseInt(searchParams.page) || 1;

	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	let where = {};

	if (status) {
		where = {
			status,
		};
	} else {
		where = {
			NOT: [{ status: 'CLOSED' as Status }],
		};
	}
	const ticketCount = await prisma.ticket.count({ where });
	const tickets = await prisma.ticket.findMany({
		where,
		take: pageSize,
		skip: (page - 1) * pageSize,
	});

	return (
		<div>
			<div className='flex gap-2'>
				<Link
					href='/tickets/new'
					className={buttonVariants({ variant: 'default' })}
				>
					New Ticket
				</Link>
				<StatusFilter />
			</div>
			<DataTable tickets={tickets} />
			<Pagination
				itemCount={ticketCount}
				pageSize={pageSize}
				currentPage={page}
			/>
		</div>
	);
};

export default Tickets;
