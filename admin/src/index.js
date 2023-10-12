import pluginPkg from '../../package.json';
import { pluginId } from './pluginId';
import Initializer from './components/Initializer';
import NoteListLayout from './components/NoteListLayout';
import { prefixPluginTranslations } from '@strapi/helper-plugin';

const name = pluginPkg.strapi.name;

export default {
	register(app) {
		app.registerPlugin({
			id: pluginId,
			initializer: Initializer,
			isReady: false,
			name,
		});
	},

	bootstrap(app) {
		app.injectContentManagerComponent('editView', 'informations', {
			name: 'note-list',
			Component: NoteListLayout,
		});
	},

	async registerTrads({ locales }) {
		const importedTrads = await Promise.all(
			locales.map((locale) => {
				return import(
					/* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
				)
					.then(({ default: data }) => {
						return {
							data: prefixPluginTranslations(data, pluginId),
							locale,
						};
					})
					.catch(() => {
						return {
							data: {},
							locale,
						};
					});
			})
		);

		return Promise.resolve(importedTrads);
	},
};
