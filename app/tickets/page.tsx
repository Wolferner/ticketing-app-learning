import prisma from '@/prisma/db';
import React from 'react';
const Tickets = async () => {
	const tickets = await prisma.ticket.findMany();

	console.log(tickets);
	return <div>Tickets</div>;
};

export default Tickets;
