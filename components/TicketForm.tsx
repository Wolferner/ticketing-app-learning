'use client';
import { ticketSchema } from '@/schemas/ticket';
import { zodResolver } from '@hookform/resolvers/zod';
import 'easymde/dist/easymde.min.css';
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

const TicketForm = () => {
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const form = useForm({
		resolver: zodResolver(ticketSchema),
		defaultValues: {
			title: '',
			description: '',
			status: '',
			priority: '',
		},
	});

	const onSubmit: SubmitHandler<TicketFormData> = async values => {
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
						control={form.control}
						render={({ field }) => (
							<SimpleMdeReact placeholder='description' {...field} />
						)}
					/>
					<div className='flex w-full space-x-4'>
						<FormField
							control={form.control}
							name='status'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Status...' />
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
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Priority...' />
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
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default TicketForm;
