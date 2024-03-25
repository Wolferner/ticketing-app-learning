'use client';
import { ticketSchema } from '@/schemas/ticket';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ticket } from '@prisma/client';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SimpleMdeReact from 'react-simplemde-editor';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
	ticket?: Ticket;
}

const TicketForm = ({ ticket }: Props) => {
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [error, setError] = React.useState<string>('');
	const router = useRouter();

	const form = useForm<TicketFormData>({
		resolver: zodResolver(ticketSchema),
		// defaultValues: {
		// 	title: '',
		// 	description: '',
		// 	status: '',
		// 	priority: '',
		// },
	});

	const onSubmit: SubmitHandler<TicketFormData> = async values => {
		try {
			setIsSubmitting(true);
			setError('');
			if (ticket) {
				await axios.patch('/api/tickets/' + ticket.id, values);
			} else {
				await axios.post('/api/tickets', values);
			}

			setIsSubmitting(false);
			router.push('/tickets');
			router.refresh();
		} catch (error) {
			console.error(error);
			setError('Unknown error');
			setIsSubmitting(false);
		}
		console.log(values);
	};

	return (
		<div className='rounded-md border w-full p-4'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					<FormField
						control={form.control}
						name='title'
						defaultValue={ticket?.title}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ticket</FormLabel>
								<FormControl>
									<Input placeholder='Ticket title...' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<Controller
						name='description'
						defaultValue={ticket?.description}
						control={form.control}
						render={({ field }) => (
							<SimpleMdeReact placeholder='description' {...field} />
						)}
					/>
					<div className='flex w-full space-x-4'>
						<FormField
							control={form.control}
							name='status'
							defaultValue={ticket?.status}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={ticket?.status}
													placeholder='Status...'
												/>
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value='OPEN'>Open</SelectItem>
											<SelectItem value='STARTED'>Started</SelectItem>
											<SelectItem value='CLOSED'>Closed</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='priority'
							defaultValue={ticket?.priority}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={ticket?.priority}
													placeholder='Priority...'
												/>
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value='LOW'>Low</SelectItem>
											<SelectItem value='MEDIUM'>Medium</SelectItem>
											<SelectItem value='HIGH'>High</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' disabled={isSubmitting}>
						{ticket ? 'Edit Ticket' : 'Create Ticket'}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default TicketForm;
