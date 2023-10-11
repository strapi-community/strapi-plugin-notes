import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import Trash from '@strapi/icons/Trash';
import Pencil from '@strapi/icons/Pencil';
import { Typography } from '@strapi/design-system/Typography';
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';
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

export { NoteListItem };
