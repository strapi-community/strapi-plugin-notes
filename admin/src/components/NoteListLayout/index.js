import React from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Box } from '@strapi/design-system';
import { NoteListLayoutHeader } from './components/NoteListLayoutHeader';
import { NoteListLayoutFooter } from './components/NoteListLayoutFooter';
import { NoteListLayoutContent } from './components/NoteListLayoutContent';

const NoteListLayout = () => {
	const { isCreatingEntry, modifiedData, slug } = useCMEditViewDataManager();

	if (isCreatingEntry) {
		return null;
	}

	const id = modifiedData.id || false;
	if (!id) {
		return null;
	}

	const entity = { id, slug };

	return (
		<Box paddingTop={4}>
			<NoteListLayoutHeader />
			<NoteListLayoutContent entity={entity} />
			<NoteListLayoutFooter entity={entity} />
		</Box>
	);
};

export { NoteListLayout };
