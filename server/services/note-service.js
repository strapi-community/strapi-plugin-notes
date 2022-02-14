'use strict';

const { pluginId } = require('../utils/pluginId');

const uid = `plugin::${pluginId}.note`;

module.exports = ({ strapi }) => ({
	/**
	 * Returns the currently stored notes
	 *
	 * @return {Promise<array>} notes
	 */
	find(options = {}) {
		return strapi.entityService.findMany(uid, options);
	},

	/**
	 * Returns the a specific stored note
	 *
	 * @return {Promise<Object>} note
	 */
	findOne(id, options = {}) {
		return strapi.entityService.findOne(uid, id, options);
	},

	/**
	 * Create a note
	 *
	 * @return {Promise<Object>} note
	 */
	create(note) {
		return strapi.entityService.create(uid, { data: note });
	},

	/**
	 * Deletes a note
	 *
	 * @return {Promise<Object>} note
	 */
	delete(id) {
		return strapi.entityService.delete(uid, id);
	},

	/**
	 * Update a note
	 *
	 * @return {Promise<Object>} note
	 */
	update(id, note) {
		return strapi.entityService.update(uid, id, { data: note });
	},
});
