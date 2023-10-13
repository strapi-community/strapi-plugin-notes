import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import {
	ModalLayout,
	ModalBody,
	ModalHeader,
	ModalFooter,
	TextInput,
	Textarea,
	Button,
	Typography,
	Stack,
} from '@strapi/design-system';
import { Check } from '@strapi/icons';
import { useNote } from '../../hooks/useNote';
import { getTrad } from '../../utils';

const NoteModal = ({ entity, note = {}, setIsNoteModalVisible }) => {
	const [entityNote, setEntityNote] = useState(note);
	const { createNote, updateNote } = useNote();
	const { formatMessage } = useIntl();

	const isExistingNote = entityNote.id;

	const handleNoteUpsert = async () => {
		try {
			if (!isExistingNote) {
				await createNote({
					title: entityNote.attributes.title,
					content: entityNote.attributes.content,
					entityId: entity.id,
					entitySlug: entity.slug,
				});
			} else {
				await updateNote({
					id: note.id,
					body: {
						title: entityNote.attributes.title,
						content: entityNote.attributes.content,
					},
				});
			}
		} catch (error) {
			console.error(error);
		}
		setIsNoteModalVisible(false);
	};

	const updateState = (key, value) => {
		setEntityNote({
			...entityNote,
			attributes: {
				...entityNote.attributes,
				[key]: value,
			},
		});
	};

	return (
		<ModalLayout onClose={() => setIsNoteModalVisible(false)} labelledBy="title">
			<ModalHeader>
				<Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
					{formatMessage({
						id: getTrad(`note.modal.${isExistingNote ? 'existing' : 'new'}.title`),
						defaultMessage: isExistingNote ? 'Edit a note' : 'Add a note',
					})}
				</Typography>
			</ModalHeader>
			<ModalBody>
				<Stack size={2}>
					<TextInput
						label="Title"
						onChange={(e) => updateState('title', e.target.value)}
						defaultValue={isExistingNote ? entityNote.attributes.title : ''}
					/>
					<Textarea
						label="Content"
						onChange={(e) => updateState('content', e.target.value)}
						defaultValue={isExistingNote ? entityNote.attributes.content : ''}
					></Textarea>
				</Stack>
			</ModalBody>
			<ModalFooter
				startActions={
					<Button onClick={() => setIsNoteModalVisible(false)} variant="tertiary">
						{formatMessage({
							id: getTrad('note.modal.actions.cancel'),
							defaultMessage: 'Cancel',
						})}
					</Button>
				}
				endActions={
					<Button onClick={handleNoteUpsert} startIcon={<Check />}>
						{formatMessage({
							id: getTrad('note.modal.actions.save'),
							defaultMessage: 'Save',
						})}
					</Button>
				}
			/>
		</ModalLayout>
	);
};

NoteModal.propTypes = {
	setIsNoteModalVisible: PropTypes.func.isRequired,
	note: PropTypes.object,
	entity: PropTypes.object.isRequired,
};

export default NoteModal;
