import React from 'react';
import { Box, Divider, Typography } from '@strapi/design-system';

const NoteListLayoutHeader = () => {
	return (
		<React.Fragment>
			<Typography variant="sigma" textColor="neutral600">
				Notes
			</Typography>
			<Box marginTop={2}>
				<Divider />
			</Box>
		</React.Fragment>
	);
};

export default NoteListLayoutHeader;
