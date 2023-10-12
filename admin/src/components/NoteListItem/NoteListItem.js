import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Typography, IconButton, IconButtonGroup } from '@strapi/design-system';
import { Trash, Pencil } from '@strapi/icons';
import { useNote } from '../../hooks/useNote';

const NoteListItem = ({ note, setActiveNote, toggleModal }) => {
	const { deleteNote } = useNote();

	const openNoteCreateModel = () => {
		setActiveNote(note);
		toggleModal();
	};

	const handleNoteDelete = (note) => {
		deleteNote({ id: note.id });
	};

	return (
		<Box paddingTop={2} paddingBottom={2}>
			<Flex justifyContent="space-between">
				<Box style={{ maxWidth: '60%' }}>
					<Typography variant="pi" ellipsis>
						{note.attributes.title}
					</Typography>
				</Box>
				<IconButtonGroup>
					<IconButton
						style={{ border: 'none' }}
						onClick={() => openNoteCreateModel(note)}
						label="Edit"
						icon={<Pencil />}
					/>
					<IconButton
						style={{ border: 'none' }}
						onClick={() => handleNoteDelete(note)}
						label="Delete"
						icon={<Trash />}
					/>
				</IconButtonGroup>
			</Flex>
		</Box>
	);
};

NoteListItem.propTypes = {
	note: PropTypes.object.isRequired,
	setActiveNote: PropTypes.func.isRequired,
	toggleModal: PropTypes.func.isRequired,
};

export default NoteListItem;
