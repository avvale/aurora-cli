/* eslint-disable quotes */
import * as handlebars from 'handlebars';

handlebars.registerPartial('manyToManyArrayItems',
    `{{#each schema.properties.withRelationshipManyToMany}}, '{{ toCamelCase name }}'{{/each}}`);
