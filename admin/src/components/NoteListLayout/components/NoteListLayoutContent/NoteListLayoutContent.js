import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@strapi/design-system';
import NoteModalCreate from '../../../NoteCreateModal';
import NoteListItem from '../../../NoteListItem';
import { useNote } from '../../../../hooks/useNote';

const NoteListLayoutContent = ({ entity }) => {
	const { getNotes } = useNote();
	const [isVisible, setIsVisible] = useState(false);
	const [activeNote, setActiveNote] = useState({});
	const [notes, setNotes] = useState([]);
	const toggleModal = () => setIsVisible((prev) => !prev);

	const { isLoading, data, isRefetching } = getNotes({
		filters: {
			entityId: entity.id,
			entitySlug: entity.slug,
		},
		sort: { createdAt: 'ASC' },
	});

	// set initial data to state so its reactive
	useEffect(() => {
		if (!isLoading && !isRefetching) {
			if (data.length) {
				setNotes([...data]);
			} else {
				setNotes([]);
			}
		}
	}, [isLoading, isRefetching]);

	return (
		<React.Fragment>
			<Stack
				marginBottom={4}
				style={{ maxHeight: '150px', overflowY: 'auto', overflowX: 'hidden' }}
			>
				{!isLoading &&
					notes.map((n) => (
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

export default NoteListLayoutContent;
