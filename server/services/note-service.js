'use strict';

/**
 * note service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::entity-notes.note');
