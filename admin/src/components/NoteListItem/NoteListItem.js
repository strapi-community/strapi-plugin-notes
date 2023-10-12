import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton, IconButtonGroup, Flex } from '@strapi/design-system';
import { Trash, Pencil } from '@strapi/icons';
import { useNote } from '../../hooks/useNote';

const NoteListItem = ({ note, setActiveNote, toggleModal }) => {
	const { deleteNote } = useNote();

	const openNoteModel = () => {
		setActiveNote({ ...note });
		toggleModal(true);
	};

	const handleNoteDelete = (note) => {
		deleteNote({ id: note.id });
	};

	return (
		<Box
			tabIndex={0}
			hasRadius
			padding={2}
			background="neutral0"
			borderStyle="solid"
			borderWidth="1px"
			borderColor="neutral150"
			shadow="tableShadow"
			as="article"
		>
			<Flex gap={2} justifyContent={'space-between'}>
				<Typography variant="pi" textColor="neutral800" fontWeight="bold" as="div" ellipsis>
					{note.attributes.title}
				</Typography>

				<IconButtonGroup>
					<IconButton
						style={{ border: 'none' }}
						onClick={() => openNoteModel(note)}
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
