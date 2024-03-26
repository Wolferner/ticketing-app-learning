import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { buttonVariants } from '@/components/ui/button';
import prisma from '@/prisma/db';
import Link from 'next/link';
import React from 'react';
import DataTable from './DataTable';

interface SearchParams {
	page: string;
}
interface Props {
	searchParams: SearchParams;
}
const Tickets = async ({ searchParams }: Props) => {
	const pageSize = 10;
	const page = parseInt(searchParams.page) || 1;
	const ticketCount = await prisma.ticket.count();
	const tickets = await prisma.ticket.findMany({
		take: pageSize,
		skip: (page - 1) * pageSize,
	});

	return (
		<div>
			<Link
				href='/tickets/new'
				className={buttonVariants({ variant: 'default' })}
			>
				New Ticket
			</Link>
			<StatusFilter />
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
