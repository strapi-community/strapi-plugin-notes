'use strict';

const { pluginId } = require('../utils/pluginId');

const { getPluginService } = require('../utils/getPluginService');

const uid = `plugin::${pluginId}.note`;

module.exports = ({ strapi }) => ({
	/**
	 *  Fetch the current notes
	 *
	 * @return {Array} notes
	 */
	async find(ctx) {
		const notes = await getPluginService(strapi, 'noteService').find(ctx.query);
		const query = strapi.db.query(uid);

		await Promise.all(
			notes.map(async (item, index) => {
				const foundItem = await query.findOne({
					where: {
						id: item.id,
					},
					populate: ['createdBy', 'updatedBy'],
				});
				if (foundItem.createdBy)
					notes[index].createdBy = {
						id: foundItem.createdBy.id,
						firstname: foundItem.createdBy.firstname,
						lastname: foundItem.createdBy.lastname,
					};
				if (foundItem.updatedBy)
					notes[index].updatedBy = {
						id: foundItem.updatedBy.id,
						firstname: foundItem.updatedBy.firstname,
						lastname: foundItem.updatedBy.lastname,
					};
			})
		);

		ctx.send({ data: notes });
	},

	/**
	 *  Create a note
	 *
	 * @return {Object} note
	 */
	async create(ctx) {
		const { body } = ctx.request;
		body['created_by_id'] = ctx.state.user.id;
		body['updated_by_id'] = ctx.state.user.id;
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
		body['updated_by_id'] = ctx.state.user.id;
		const note = await getPluginService(strapi, 'noteService').findOne(id);

		if (!note) {
			return ctx.notFound('note not found');
		}

		const updatedNote = await getPluginService(strapi, 'noteService').update(id, body);

		ctx.send({ data: { note: updatedNote } });
	},
});
