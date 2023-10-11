import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import {
	ModalLayout,
	ModalBody,
	ModalHeader,
	ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { TextInput } from '@strapi/design-system/TextInput';
import { Textarea } from '@strapi/design-system/Textarea';
import { Button } from '@strapi/design-system/Button';
import { Typography } from '@strapi/design-system/Typography';
import { Stack } from '@strapi/design-system/Stack';
import Check from '@strapi/icons/Check';
import { requestPluginEndpoint } from '../../utils/requestPluginEndpoint';

const NoteModalCreate = ({ toggleModal, note = {}, entity }) => {
	const [values, setValues] = useState(note);
	const queryClient = useQueryClient();

	const handleNoteUpsert = () => {
		const method = note.id ? 'PUT' : 'POST';
		let endpoint = 'notes';
		if (note.id) {
			endpoint += '/' + note.id;
		}
		requestPluginEndpoint(endpoint, {
			method,
			body: {
				data: {
					title: values.attributes.title,
					content: values.attributes.content,
					entityId: entity.id,
					entitySlug: entity.slug,
				},
			},
		});
		toggleModal();
	};

	const updateState = (key, value) => {
		let updatedNote = {
			attributes: {
				[key]: value,
			},
		};

		setValues((prev) => ({
			...prev,
			...updatedNote,
		}));
	};

	const mutation = useMutation(handleNoteUpsert, {
		onSuccess: () => {
			queryClient.invalidateQueries('entity-notes');
		},
	});

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
					<Textarea label="Content" onChange={(e) => updateState('content', e.target.value)}>
						{values.id ? values.attributes.content : ''}
					</Textarea>
				</Stack>
			</ModalBody>
			<ModalFooter
				startActions={
					<Button onClick={toggleModal} variant="tertiary">
						Cancel
					</Button>
				}
				endActions={
					<Button onClick={() => mutation.mutate()} startIcon={<Check />}>
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

export { NoteModalCreate };
