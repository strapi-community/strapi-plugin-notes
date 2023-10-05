import React from 'react';
import PropTypes from 'prop-types';
import { Trash, Pencil } from '@strapi/icons';
import { Typography, Flex, Box, IconButton, IconButtonGroup } from '@strapi/design-system';
import { requestPluginEndpoint } from '../../utils/requestPluginEndpoint';

import { useMutation, useQueryClient } from 'react-query';

const deleteNote = (id) => {
	requestPluginEndpoint('notes/' + id, {
		method: 'DELETE',
	});
};

const NoteListItem = ({ note, setActiveNote, toggleModal }) => {
	const queryClient = useQueryClient();

	const openNoteCreateModel = () => {
		setActiveNote(note);
		toggleModal();
	};
	const mutation = useMutation(deleteNote, {
		onSuccess: () => {
			queryClient.invalidateQueries('entity-notes');
		},
	});

	const handleNoteDelete = (note) => {
		mutation.mutate(note.id);
	};

	return (
		<Box paddingTop={2} paddingBottom={2}>
			<Flex justifyContent="space-between">
				<Box style={{ maxWidth: '60%' }}>
					<Typography variant="pi" ellipsis>
						{note.title}
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

export { NoteListItem };
