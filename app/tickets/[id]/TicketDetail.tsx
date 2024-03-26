import AssignTicket from '@/components/AssignTicket';
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
import { Ticket, User } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import ReactMarkDown from 'react-markdown';
import DeleteButton from './DeleteButton';

interface Props {
	ticket: Ticket;
	users: User[];
}

const TicketDetail = ({ ticket, users }: Props) => {
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
				<CardContent className='prose dark:prose-invert'>
					<ReactMarkDown>{ticket.description}</ReactMarkDown>
				</CardContent>
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
				<AssignTicket ticket={ticket} users={users} />
				<Link
					href={`/tickets/edit/${ticket.id}`}
					className={`${buttonVariants({ variant: 'default' })}`}
				>
					Edit ticket
				</Link>
				<DeleteButton ticketId={ticket.id} />
			</div>
		</div>
	);
};

export default TicketDetail;
