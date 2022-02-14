import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextButton } from '@strapi/design-system/TextButton';
import Plus from '@strapi/icons/Plus';
import { NoteModalCreate } from '../../../NoteCreateModal';
const NoteListLayoutFooter = ({ entity }) => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleModal = () => setIsVisible((prev) => !prev);

	return (
		<React.Fragment>
			<TextButton label="Notes" endIcon={<Plus />} onClick={toggleModal}>
				Add a note
			</TextButton>
			{isVisible && <NoteModalCreate toggleModal={toggleModal} entity={entity} />}
		</React.Fragment>
	);
};

NoteListLayoutFooter.propTypes = {
	entity: PropTypes.object.isRequired,
};

export { NoteListLayoutFooter };
