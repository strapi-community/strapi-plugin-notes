'use strict';

module.exports = {
	kind: 'collectionType',
	collectionName: 'notes',
	info: {
		singularName: 'note',
		pluralName: 'notes',
		displayName: 'notes',
	},
	pluginOptions: {
		'content-manager': {
			visible: false,
		},
		'content-type-builder': {
			visible: false,
		},
	},
	options: {
		draftAndPublish: false,
		comment: '',
	},
	attributes: {
		title: {
			type: 'string',
		},
		content: {
			type: 'text',
		},
		entityId: {
			type: 'integer',
		},
		entitySlug: {
			type: 'string',
		},
	},
};
