/* eslint-disable quotes */
import * as handlebars from 'handlebars';

handlebars.registerPartial('manyToManyArrayItems',
    `{{#each (getManyToManyRelationshipProperties schema.aggregateProperties) }}, '{{ toCamelCase (getPropertyName this) }}'{{/each}}`,
);
