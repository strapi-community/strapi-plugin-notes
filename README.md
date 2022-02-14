# strapi-plugin-notes

A plugin for [Strapi](https://github.com/strapi/strapi) that provides the ability to add notes to entity records.

## Requirements

The installation requirements are the same as Strapi itself and can be found in the documentation on the [Quick Start](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html) page in the Prerequisites info card.

### Supported Strapi versions

- v4.x.x

**NOTE**: While this plugin may work with the older Strapi versions, they are not supported, it is always recommended to use the latest version of Strapi.

## Installation

```sh
npm install strapi-plugin-notes
```

**or**

```sh
yarn add strapi-plugin-notes
```

## Configuration

The plugin configuration is stored in a config file located at `./config/plugins.js`.

```javascript
module.exports = ({ env }) => ({
	'entity-notes': {
		enabled: true,
	},
});
```

**IMPORTANT NOTE**: Make sure any sensitive data is stored in env files.

## Usage

Once the plugin has been installed, configured a notes section will be added to the `informations` sections of the edit view for all content types.

### Adding a note

Navigate to the entity record that a note needs to be added to and click the `Add new note` text button. A modal will appear with input areas to add the note information. Once completed select save to create the note. Clicking the `x` icon on the top right or cancel on the bottom left will abort the note creation.

### Editing a note

Navigate to the entity record that the note belongs to, and find the note in the notes list. Click on the pen can icon and a modal will appear with input areas to add the note information. Once completed select save to permanently save any changes that have been made. Clicking the `x` icon on the top right or cancel on the bottom left will abort all edits.

### Deleting a note

Navigate to the entity record that the note belongs to, and find the note in the notes list. Click on the trash can icon and the record will be deleted.

## Bugs

If any bugs are found please report them as a [Github Issue](https://github.com/ComfortablyCoding/strapi-plugin-notes/issues)
