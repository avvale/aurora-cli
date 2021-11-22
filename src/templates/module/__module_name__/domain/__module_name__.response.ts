{{#each schema.properties.withRelationshipOneToOne}}
import { {{ toPascalCase getRelationshipModule }}Response } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.response';
{{/each}}
{{#each schema.properties.withRelationshipManyToOne}}
import { {{ toPascalCase getRelationshipModule }}Response } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.response';
{{/each}}
{{#each schema.properties.withRelationshipOneToMany}}
import { {{ toPascalCase getRelationshipModule }}Response } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.response';
{{/each}}
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ toPascalCase getRelationshipModule }}Response } from '{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.response';
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
        public readonly {{ toCamelCase nativeName }}: {{ toPascalCase getRelationshipModule }}Response,
        {{/each}}
        {{#each schema.properties.withRelationshipManyToOne}}
        public readonly {{ toCamelCase relationshipField }}: {{ toPascalCase getRelationshipModule }}Response,
        {{/each}}
        {{#each schema.properties.withRelationshipOneToMany}}
        public readonly {{ toCamelCase nativeName }}: {{ toPascalCase getRelationshipModule }}Response[],
        {{/each}}
        {{#each schema.properties.withRelationshipManyToMany}}
        public readonly {{ toCamelCase nativeName }}: {{ toPascalCase getRelationshipModule }}Response[],
        {{/each}}
    ) {}
}