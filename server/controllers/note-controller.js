'use strict';

const { getPluginService } = require('../utils/getPluginService');

module.exports = ({ strapi }) => ({
	/**
	 *  Fetch the current notes
	 *
	 * @return {Array} notes
	 */
	async find(ctx) {
		const notes = await getPluginService(strapi, 'noteService').find(ctx.query);

		ctx.send({ data: { notes } });
	},

	/**
	 *  Create a note
	 *
	 * @return {Object} note
	 */
	async create(ctx) {
		const { body } = ctx.request;
		const createdNote = await getPluginService(strapi, 'noteService').create(body);

		ctx.send({ data: { note: createdNote } });
	},

	/**
	 *  Delete a note
	 *
	 * @return {Object} note
	 */
	async delete(ctx) {
		const { id } = ctx.params;
		const note = await getPluginService(strapi, 'noteService').findOne(id);

		if (!note) {
			return ctx.notFound('note not found');
		}

		const deletedNote = await getPluginService(strapi, 'noteService').delete(id);

		ctx.send({ data: { note: deletedNote } });
	},

	/**
	 *  Edit a note
	 *
	 * @return {Object} note
	 */
	async update(ctx) {
		const { id } = ctx.params;
		const { body } = ctx.request;
		const note = await getPluginService(strapi, 'noteService').findOne(id);

		if (!note) {
			return ctx.notFound('note not found');
		}

		const updatedNote = await getPluginService(strapi, 'noteService').update(id, body);

		ctx.send({ data: { note: updatedNote } });
	},
});
