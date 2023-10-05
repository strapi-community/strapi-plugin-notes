import React from 'react';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Box } from '@strapi/design-system';
import { NoteListLayoutHeader } from './components/NoteListLayoutHeader';
import { NoteListLayoutContent } from './components/NoteListLayoutContent';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const NoteListLayout = () => {
	const params = useParams();
	const id = get(params, 'id', null);
	const currentEntityId = id;
	const { slug } = useCMEditViewDataManager();

	const entity = { id: currentEntityId, slug };
	return (
		<QueryClientProvider client={client}>
			<Box paddingTop={4}>
				<NoteListLayoutHeader />
				<NoteListLayoutContent entity={entity} />
			</Box>
		</QueryClientProvider>
	);
};

export { NoteListLayout };
