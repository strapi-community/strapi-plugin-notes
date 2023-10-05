import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Trash, Pencil } from '@strapi/icons';
import {
	Typography,
	Flex,
	Box,
	IconButton,
	IconButtonGroup,
	Accordion,
	AccordionToggle,
	AccordionContent,
} from '@strapi/design-system';
import { requestPluginEndpoint } from '../../utils/requestPluginEndpoint';

import { useMutation, useQueryClient } from 'react-query';

const deleteNote = async (id) => {
	await requestPluginEndpoint('notes/' + id, {
		method: 'DELETE',
	});
};

const NoteListItem = ({ note, setActiveNote, toggleModal }) => {
	const [expandedID, setExpandedID] = useState(null);
	const handleToggle = (id) => () => {
		setExpandedID((s) => (s === id ? null : id));
	};

	const queryClient = useQueryClient();

	const openNoteCreateModel = () => {
		setActiveNote(note);
		toggleModal();
	};
	const mutation = useMutation(deleteNote, {
		onSuccess: () => {
			console.log('Success');
			queryClient.fetchQuery('entity-notes');
		},
	});

	const handleNoteDelete = (note) => {
		mutation.mutate(note.id);
	};

	return (
		<Box background="neutral00">
			<Accordion
				expanded={expandedID === note.id}
				onToggle={handleToggle(note.id)}
				id={note.id}
				size="S"
				togglePosition="left"
			>
				<AccordionToggle
					title={note.title}
					description={
						<Flex direction="column" alignItems="start">
							{note.createdBy && (
								<Typography variant="pi">
									C:
									{` ${note.createdBy.firstname} ${note.createdBy.lastname} ${new Date(
										note.createdAt
									).toLocaleString('en-GB')}`}
								</Typography>
							)}
							{note.updatedBy && (
								<Typography variant="pi">
									U:
									{` ${note.updatedBy.firstname} ${note.updatedBy.lastname} ${new Date(
										note.updatedAt
									).toLocaleString('en-GB')}`}
								</Typography>
							)}
						</Flex>
					}
					action={
						<IconButtonGroup>
							<IconButton
								onClick={() => openNoteCreateModel(note)}
								label="Edit"
								icon={<Pencil />}
							/>
							<IconButton onClick={() => handleNoteDelete(note)} label="Delete" icon={<Trash />} />
						</IconButtonGroup>
					}
				></AccordionToggle>
				<AccordionContent>
					<Box padding={2}>
						<Typography variant="pi">{note.content}</Typography>
					</Box>
				</AccordionContent>
			</Accordion>
		</Box>
	);
};

NoteListItem.propTypes = {
	note: PropTypes.object.isRequired,
	setActiveNote: PropTypes.func.isRequired,
	toggleModal: PropTypes.func.isRequired,
};

export { NoteListItem };
