import TicketPriority from '@/components/TicketPriority';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import { buttonVariants } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Ticket } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Props {
	ticket: Ticket;
}

const TicketDetail = ({ ticket }: Props) => {
	return (
		<div className='lg:grid lg:grid-cols-4'>
			<Card className='mx-4 mb-4 lg:col-span-3 lg:mr-4'>
				<CardHeader>
					<div className='flex justify-between'>
						<TicketStatusBadge status={ticket.status} />
						<TicketPriority priority={ticket.priority} />
					</div>
					<CardTitle>{ticket.title}</CardTitle>
					<CardDescription>
						Created:{' '}
						{ticket.createdAt.toLocaleDateString('en-UK', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
							hour12: false,
						})}
					</CardDescription>
				</CardHeader>
				<CardContent>{ticket.description}</CardContent>
				<CardFooter>
					Updated:{' '}
					{ticket.updatedAt.toLocaleDateString('en-UK', {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						hour12: false,
					})}
				</CardFooter>
			</Card>
			<div className='mx-4 flex lg:flex-col lg:mx-0  gap-2'>
				<Link
					href={`/tickets/edit/${ticket.id}`}
					className={`${buttonVariants({ variant: 'default' })}`}
				>
					Edit ticket
				</Link>
				<Link
					href={`/tickets/edit/${ticket.id}`}
					className={`${buttonVariants({ variant: 'default' })}`}
				>
					Delete ticket
				</Link>
			</div>
		</div>
	);
};

export default TicketDetail;
