import React from 'react';
import { Box } from '@strapi/design-system/Box';
import { Divider } from '@strapi/design-system/Divider';
import { Typography } from '@strapi/design-system/Typography';

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

export { NoteListLayoutHeader };
