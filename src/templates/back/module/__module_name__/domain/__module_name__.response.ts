{{#each schema.properties.withRelationshipOneToOne}}
import { {{ toPascalCase getRelationshipModule }}Response } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.response{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipManyToOne}}
{{#unless (isI18NRelationProperty ../schema.moduleName this)}}
import { {{ toPascalCase getRelationshipModule }}Response } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.response{{/if}}';
{{/unless}}
{{/each}}
{{#each schema.properties.withRelationshipOneToMany}}
import { {{ toPascalCase getRelationshipModule }}Response } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.response{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ toPascalCase getRelationshipModule }}Response } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.response{{/if}}';
{{/each}}

export class {{ toPascalCase schema.moduleName }}Response
{
    constructor(
        {{#each schema.properties.response}}
        {{#if (allowProperty ../schema.moduleName this)}}
        public readonly {{ toCamelCase name }}: {{ getJavascriptType }},
        {{/if}}
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
        public readonly {{ toCamelCase relationshipField }}: {{ toPascalCase getRelationshipModule }}Response,
        {{/each}}
        {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
        public readonly {{ toCamelCase originName }}: {{ toPascalCase getRelationshipModule }}Response,
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        {{#unless (isI18NRelationProperty ../schema.moduleName this)}}
        public readonly {{ toCamelCase relationshipField }}: {{ toPascalCase getRelationshipModule }}Response,
        {{/unless}}
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        public readonly {{ toCamelCase originName }}: {{ toPascalCase getRelationshipModule }}Response[],
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        public readonly {{ toCamelCase originName }}: {{ toPascalCase getRelationshipModule }}Response[],
        {{/each}}
    ) {}
}