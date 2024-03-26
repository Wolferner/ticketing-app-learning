'use client';
import {
	ChevronFirstIcon,
	ChevronLastIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

interface Props {
	itemCount: number;
	pageSize: number;
	currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
	const pageCount = Math.ceil(itemCount / pageSize);
	const router = useRouter();
	const searchParams = useSearchParams();

	if (pageCount <= 1) return null;

	const changePage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', page.toString());
		router.push('?' + params.toString());
	};

	return (
		<div className='flex  gap-2 items-center py-3'>
			<div>
				<Button
					variant='outline'
					disabled={currentPage === 1}
					onClick={() => changePage(1)}
				>
					<ChevronFirstIcon />
				</Button>
				<Button
					variant='outline'
					disabled={currentPage === 1}
					onClick={() => changePage(currentPage - 1)}
				>
					<ChevronLeftIcon />
				</Button>
				<Button
					variant='outline'
					disabled={currentPage === pageCount}
					onClick={() => changePage(currentPage + 1)}
				>
					<ChevronRightIcon />
				</Button>
				<Button
					variant='outline'
					disabled={currentPage === pageCount}
					onClick={() => changePage(pageCount)}
				>
					<ChevronLastIcon />
				</Button>
			</div>
			<div>
				Page {currentPage} of {pageCount}
			</div>
		</div>
	);
};

export default Pagination;
