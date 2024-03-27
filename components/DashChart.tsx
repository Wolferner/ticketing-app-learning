'use client';
import { Status } from '@prisma/client';
import React from 'react';
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface dataProps {
	data: dataElements[];
}

interface dataElements {
	name: Status;
	total: number;
}
const DashChart = ({ data }: dataProps) => {
	// console.log(data);
	return (
		<Card className='col-span-4'>
			<CardHeader>
				<CardTitle>Ticket Counts</CardTitle>
			</CardHeader>
			<CardContent className='pl-2'>
				<ResponsiveContainer width='100%' height={350}>
					<BarChart
						data={data}
						className='[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800'
					>
						<XAxis
							dataKey='name'
							stroke='#888888'
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							stroke='#888888'
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<Tooltip
							separator=': '
							labelClassName='font-bold'
							wrapperClassName='!text-sm dark:!bg-black rounded-md dark:!border-border'
							formatter={(value, name) => {
								if (name === 'total') {
									return [value, 'Total cases'];
								}
							}}
						/>
						<Bar dataKey='total' fill='#2a87f9' radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default DashChart;
