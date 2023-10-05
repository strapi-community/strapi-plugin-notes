import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { AccordionGroup } from '@strapi/design-system';
import { NoteModalCreate } from '../../../NoteCreateModal';
import { requestPluginEndpoint } from '../../../../utils/requestPluginEndpoint';
import { NoteListItem } from '../../../NoteListItem';
import { NoteListLayoutFooter } from '../NoteListLayoutFooter';

const fetchEntityNotes = async (entitySlug, entityId) => {
	let params = {
		'filters[entitySlug][$eq]': entitySlug,
		'sort[createdAt]': 'DESC',
	//	'populate[0]': 'createdBy',
	//	'populate[1]': 'updatedBy',
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
			<AccordionGroup footer={<NoteListLayoutFooter entity={entity} />} marginBottom={4}>
				{!query.isLoading &&
					query.data.data.map((n) => (
						<NoteListItem
							key={n.id}
							note={n}
							setActiveNote={setActiveNote}
							toggleModal={toggleModal}
						/>
					))}
			</AccordionGroup>
			{isVisible && <NoteModalCreate toggleModal={toggleModal} entity={entity} note={activeNote} />}
		</React.Fragment>
	);
};

NoteListLayoutContent.propTypes = {
	entity: PropTypes.object.isRequired,
};

export { NoteListLayoutContent };
