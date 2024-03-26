import TicketPriority from '@/components/TicketPriority';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Ticket } from '@prisma/client';
import { ArrowDownIcon } from 'lucide-react';
import Link from 'next/link';
import { title } from 'process';
import React from 'react';
import { SearchParams } from './page';

interface Props {
	tickets: Ticket[];
	searchParams: SearchParams;
}

const DataTable = ({ tickets, searchParams }: Props) => {
	console.log(tickets);
	return (
		<div className='w-full mt-5'>
			<div className='rounded-md sm:border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<Link href={{ query: { ...searchParams, orderBy: 'title' } }}>
									Title
								</Link>
								{'title' === searchParams.orderBy && (
									<ArrowDownIcon className='inline p-1' />
								)}
							</TableHead>
							<TableHead>
								<div className='flex justify-center'>
									<Link
										href={{ query: { ...searchParams, orderBy: 'status' } }}
									>
										Status
									</Link>
									{'status' === searchParams.orderBy && (
										<ArrowDownIcon className='inline p-1' />
									)}
								</div>
							</TableHead>
							<TableHead>
								<div className='flex justify-center'>
									<Link
										href={{ query: { ...searchParams, orderBy: 'priority' } }}
									>
										Priority
									</Link>
									{'priority' === searchParams.orderBy && (
										<ArrowDownIcon className='inline p-1' />
									)}
								</div>
							</TableHead>
							<TableHead>
								<Link
									href={{ query: { ...searchParams, orderBy: 'createdAt' } }}
								>
									Created At
								</Link>
								{'createdAt' === searchParams.orderBy && (
									<ArrowDownIcon className='inline p-1' />
								)}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tickets ? (
							tickets.map(ticket => (
								<TableRow key={ticket.id} data-href=''>
									<TableCell>
										<Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
									</TableCell>
									<TableCell>
										<div className='flex justify-center'>
											<TicketStatusBadge status={ticket.status} />
										</div>
									</TableCell>
									<TableCell>
										<div className='flex justify-center'>
											<TicketPriority priority={ticket.priority} />
										</div>
									</TableCell>
									<TableCell>
										{ticket.createdAt.toLocaleDateString('en-UK', {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
											hour: 'numeric',
											minute: 'numeric',
											hour12: false,
										})}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4}>No tickets found</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default DataTable;
