import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { Stack } from '@strapi/design-system/Stack';
import { NoteModalCreate } from '../../../NoteCreateModal';
import { requestPluginEndpoint } from '../../../../utils/requestPluginEndpoint';
import { NoteListItem } from '../../../NoteListItem';

const fetchEntityNotes = async (entitySlug, entityId) => {
	let params = {
		'filters[entitySlug][$eq]': entitySlug,
		'sort[createdAt]': 'ASC',
	};
	if (entityId) {
		params['filters[entityId][$eq]'] = entityId;
	}
	return requestPluginEndpoint('notes', {
		params,
	});
};

const NoteListLayoutContent = ({ entity }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [activeNote, setActiveNote] = useState({});
	const toggleModal = () => setIsVisible((prev) => !prev);

	const query = useQuery('entity-notes', () => fetchEntityNotes(entity.slug, entity.id));

	return (
		<React.Fragment>
			<Stack
				marginBottom={4}
				style={{ maxHeight: '150px', overflowY: 'auto', overflowX: 'hidden' }}
			>
				{!query.isLoading &&
					query.data.data.notes.map((n) => (
						<NoteListItem
							key={n.id}
							note={n}
							setActiveNote={setActiveNote}
							toggleModal={toggleModal}
						/>
					))}
			</Stack>
			{isVisible && <NoteModalCreate toggleModal={toggleModal} entity={entity} note={activeNote} />}
		</React.Fragment>
	);
};

NoteListLayoutContent.propTypes = {
	entity: PropTypes.object.isRequired,
};

export { NoteListLayoutContent };
