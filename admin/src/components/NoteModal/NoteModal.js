import React, { useState } from 'react';
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

const NoteModal = ({ entity, note = {}, toggleModal }) => {
	const [entityNote, setEntityNote] = useState(note);
	const { createNote, updateNote } = useNote();

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
		toggleModal(false);
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
		<ModalLayout onClose={toggleModal} labelledBy="title">
			<ModalHeader>
				<Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
					{isExistingNote ? 'Edit a note' : 'Add a note'}
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
					<Button onClick={toggleModal} variant="tertiary">
						Cancel
					</Button>
				}
				endActions={
					<Button onClick={handleNoteUpsert} startIcon={<Check />}>
						Save
					</Button>
				}
			/>
		</ModalLayout>
	);
};

NoteModal.propTypes = {
	toggleModal: PropTypes.func.isRequired,
	note: PropTypes.object,
	entity: PropTypes.object.isRequired,
};

export default NoteModal;
