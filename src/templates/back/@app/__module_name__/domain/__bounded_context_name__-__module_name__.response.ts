{{#each schema.aggregateProperties.withImportRelationshipOneToOne}}
import { {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipManyToOne}}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
import { {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/unless}}
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipOneToMany}}
import { {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each (getWithImportRelationshipManyToManyProperties schema.aggregateProperties)}}
import { {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}

export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response
{
    constructor(
        {{#each schema.aggregateProperties.response}}
        {{#if (isAllowProperty ../schema.moduleName this)}}
        public readonly {{ toCamelCase (getNameProperty this) }}: {{ getJavascriptType }},
        {{/if}}
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipOneToOneWithRelationshipField}}
        public readonly {{ toCamelCase relationship.field }}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response,
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipOneToOneWithoutRelationshipField}}
        public readonly {{ toCamelCase name }}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response,
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipManyToOne}}
        {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
        public readonly {{ toCamelCase relationship.field }}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response,
        {{/unless}}
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipOneToMany}}
        public readonly {{ toCamelCase name }}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response[],
        {{/each}}
        {{#each schema.aggregateProperties.withRelationshipManyToMany}}
        public readonly {{ toCamelCase name }}: {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Response[],
        {{/each}}
    ) {}
}
