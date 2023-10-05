import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextButton, Flex } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { NoteModalCreate } from '../../../NoteCreateModal';
const NoteListLayoutFooter = ({ entity }) => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleModal = () => setIsVisible((prev) => !prev);

	return (
		<React.Fragment>
			<Flex justifyContent="center" height="30px" background="neutral150">
				<TextButton label="Notes" startIcon={<Plus />} onClick={toggleModal}>
					Add a note
				</TextButton>
			</Flex>
			{isVisible && <NoteModalCreate toggleModal={toggleModal} entity={entity} />}
		</React.Fragment>
	);
};

NoteListLayoutFooter.propTypes = {
	entity: PropTypes.object.isRequired,
};

export { NoteListLayoutFooter };
