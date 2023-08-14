{{#each schema.properties.withImportRelationshipOneToOne}}
import { {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Response } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each schema.properties.withImportRelationshipManyToOne}}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
import { {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Response } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/unless}}
{{/each}}
{{#each schema.properties.withImportRelationshipOneToMany}}
import { {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Response } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each schema.properties.withImportRelationshipManyToMany}}
import { {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Response } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}

export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response
{
    constructor(
        {{#each schema.properties.response}}
        {{#if (isAllowProperty ../schema.moduleName this)}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/if}}
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        public readonly {{ toCamelCase relationship.field }}: {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Response,
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        public readonly {{ toCamelCase originName }}: {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Response,
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
        public readonly {{ toCamelCase relationship.field }}: {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Response,
        {{/unless}}
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        public readonly {{ toCamelCase originName }}: {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Response[],
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        public readonly {{ toCamelCase originName }}: {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Response[],
        {{/each}}
    ) {}
}
