'use client';

import { Ticket, User } from '@prisma/client';
import axios from 'axios';
import React, { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';

interface Props {
	ticket: Ticket;
	users: User[];
}
const AssignTicket = ({ ticket, users }: Props) => {
	const [isAssigning, setIsAssigning] = useState(false);
	const [error, setError] = useState('');

	const AssignTicket = async (userId: string) => {
		setError('');
		setIsAssigning(true);

		await axios
			.patch(`/api/tickets/${ticket.id}`, {
				assignedToUserId: userId === '0' ? null : userId,
			})
			.catch(error => {
				setError('Unable to Assign Ticket!');
			});

		setIsAssigning(false);
	};

	return (
		<>
			<Select
				defaultValue={ticket.assignedToUserId?.toString() || '0'}
				onValueChange={AssignTicket}
				disabled={isAssigning}
			>
				<SelectTrigger>
					<SelectValue
						placeholder='Select User...'
						defaultValue={ticket.assignedToUserId?.toString() || '0'}
					></SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='0'>Unassign</SelectItem>
					{users
						? users.map(user => (
								<SelectItem key={user.id} value={user.id.toString()}>
									{user.name}
								</SelectItem>
						  ))
						: null}
				</SelectContent>
			</Select>
			<p className='text-destructive'>{error}</p>
		</>
	);
};

export default AssignTicket;
