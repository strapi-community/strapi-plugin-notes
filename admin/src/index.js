import pluginPkg from '../../package.json';
import { pluginId } from './pluginId';
import Initializer from './components/Initializer';
import NoteListLayout from './components/NoteListLayout';

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
};
