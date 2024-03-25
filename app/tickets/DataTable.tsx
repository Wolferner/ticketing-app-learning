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
import React from 'react';

interface DataTableProps {
	tickets: Ticket[];
}

const DataTable = ({ tickets }: DataTableProps) => {
	console.log(tickets);
	return (
		<div className='w-full mt-5'>
			<div className='rounded-md sm:border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>
								<div className='flex justify-center'>Status</div>
							</TableHead>
							<TableHead>Priority</TableHead>
							<TableHead>Created At</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tickets ? (
							tickets.map(ticket => (
								<TableRow key={ticket.id} data-href=''>
									<TableCell>{ticket.title}</TableCell>
									<TableCell>
										<div className='flex justify-center'>
											<TicketStatusBadge status={ticket.status} />
										</div>
									</TableCell>
									<TableCell>{ticket.priority}</TableCell>
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
