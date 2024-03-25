import dynamic from 'next/dynamic';
import React from 'react';

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
	ssr: false,
});
const newTicket = () => {
	return <TicketForm />;
};

export default newTicket;
