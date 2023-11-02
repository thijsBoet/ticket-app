'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

React;
const TicketForm = () => {
  const router = useRouter();

	const handleChange = e => {
		const value = e.target.value;
		const name = e.target.name;

		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const response = await fetch('./api/Tickets', {
			method: 'POST',
			body: JSON.stringify({ formData }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
    if(!response.ok){
      throw new Error("Failed to create ticket: ", response.statusText)
    }
    router.refresh();
    router.push('/');
	};

	const startingTicketData = {
		title: '',
		description: '',
		priority: 1,
		progress: 0,
		status: 'not started',
		category: 'Features',
	};

	const [formData, setFormData] = useState(startingTicketData);

	return (
		<div className='flex justify-center'>
			<form
				className='flex flex-col gap-3 w-1/2'
				method='POST'
				onSubmit={handleSubmit}>
				<h3>Create Your Ticket</h3>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					name='title'
					id='title'
					value={formData.title}
					onChange={handleChange}
					required
				/>
				<label htmlFor='description'>Description</label>
				<textarea
					name='description'
					id='description'
					value={formData.description}
					onChange={handleChange}
					rows={5}
					required
				/>

				<label htmlFor='category'>Category</label>
				<select
					name='category'
					id='category'
					value={formData.category}
					onChange={handleChange}>
					<option value='New Feature'>New Feature</option>
					<option value='Bug Fix'>Bug Fix</option>
					<option value='Refactor'>Refactor</option>
				</select>

				<label htmlFor='priority'>Priority</label>
				<div>
					<input
						type='radio'
						id='priority-1'
						name='priority'
						value={1}
						onChange={handleChange}
						checked={formData.priority == 1}
					/>
					<label htmlFor='priority-1'>1</label>

					<input
						type='radio'
						id='priority-2'
						name='priority'
						value={2}
						onChange={handleChange}
						checked={formData.priority == 2}
					/>
					<label htmlFor='priority-1'>2</label>

					<input
						type='radio'
						id='priority-3'
						name='priority'
						value={3}
						onChange={handleChange}
						checked={formData.priority == 3}
					/>
					<label htmlFor='priority-1'>3</label>

					<input
						type='radio'
						id='priority-4'
						name='priority'
						value={4}
						onChange={handleChange}
						checked={formData.priority == 4}
					/>
					<label htmlFor='priority-1'>4</label>

					<input
						type='radio'
						id='priority-5'
						name='priority'
						value={5}
						onChange={handleChange}
						checked={formData.priority == 5}
					/>
					<label htmlFor='priority-1'>5</label>
				</div>
				<label htmlFor='progress'>Progress</label>
				<input
					type='range'
					name='progress'
					id='progress'
					value={formData.progress}
					min={0}
					max={100}
					onChange={handleChange}
				/>
				<label htmlFor='status'>Status</label>
				<select
					name='status'
					id='status'
					value={formData.status}
					onChange={handleChange}>
					<option value='not started'>Not Started</option>
					<option value='started'>Started</option>
					<option value='done'>Done</option>
				</select>
				<input type='submit' className='btn' value={'Create Ticket'} />
			</form>
		</div>
	);
};

export default TicketForm;
