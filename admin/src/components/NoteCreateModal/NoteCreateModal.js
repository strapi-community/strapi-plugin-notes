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

const NoteModalCreate = ({ toggleModal, note = {}, entity }) => {
	const [values, setValues] = useState(note);
	const { createNote, updateNote } = useNote();

	const handleNoteUpsert = async () => {
		try {
			if (!note.id) {
				await createNote({
					title: values.attributes.title,
					content: values.attributes.content,
					entityId: entity.id,
					entitySlug: entity.slug,
				});
			} else {
				await updateNote({
					id: note.id,
					body: {
						title: values.attributes.title,
						content: values.attributes.content,
					},
				});
			}
		} catch (error) {
			console.error(error);
		}
		toggleModal();
	};

	const updateState = (key, value) => {
		setValues({
			...values,
			attributes: {
				...values.attributes,
				[key]: value,
			},
		});
	};

	return (
		<ModalLayout onClose={toggleModal} labelledBy="title">
			<ModalHeader>
				<Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
					{values.id ? 'Edit a note' : 'Add a note'}
				</Typography>
			</ModalHeader>
			<ModalBody>
				<Stack size={2}>
					<TextInput
						label="Title"
						onChange={(e) => updateState('title', e.target.value)}
						defaultValue={values.id ? values.attributes.title : ''}
					/>
					<Textarea
						label="Content"
						onChange={(e) => updateState('content', e.target.value)}
						defaultValue={values.id ? values.attributes.content : ''}
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

NoteModalCreate.propTypes = {
	toggleModal: PropTypes.func.isRequired,
	note: PropTypes.object,
	entity: PropTypes.object.isRequired,
};

export default NoteModalCreate;
