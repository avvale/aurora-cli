/* eslint-disable quotes */
import * as handlebars from 'handlebars';

handlebars.registerPartial('manyToManyArrayItems',
    `{{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}, '{{ toCamelCase (getPropertyName this) }}'{{/each}}`,
);
