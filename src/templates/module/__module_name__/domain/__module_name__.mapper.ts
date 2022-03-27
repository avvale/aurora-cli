import { IMapper, MapperOptions, ObjectLiteral, CQMetadata } from '{{ config.auroraCorePackage }}';
import { {{ schema.aggregateName }} } from './{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toPascalCase schema.moduleName }}Response } from './{{ toKebabCase schema.moduleName }}.response';
import {
    {{> importValueObjects }}
} from './value-objects';
{{#each schema.properties.withRelationshipOneToOne}}
import { {{ toPascalCase getRelationshipModule }}Mapper } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.mapper{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipManyToOne}}
{{#unless (isI18NRelationProperty ../schema.moduleName this)}}
import { {{ toPascalCase getRelationshipModule }}Mapper } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.mapper{{/if}}';
{{/unless}}
{{/each}}
{{#each schema.properties.withRelationshipOneToMany}}
import { {{ toPascalCase getRelationshipModule }}Mapper } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.mapper{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ toPascalCase getRelationshipModule }}Mapper } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/domain/{{ toKebabCase getRelationshipModule }}.mapper{{/if}}';
{{/each}}

export class {{ toPascalCase schema.moduleName }}Mapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param {{ toCamelCase schema.moduleName }}
     */
    mapModelToAggregate({{ toCamelCase schema.moduleName }}: ObjectLiteral, cQMetadata?: CQMetadata): {{ schema.aggregateName }}
    {
        if (!{{ toCamelCase schema.moduleName }}) return;

        return this.makeAggregate({{ toCamelCase schema.moduleName }}, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param {{ toCamelCase schema.moduleNames }}
     */
    mapModelsToAggregates({{ toCamelCase schema.moduleNames }}: ObjectLiteral[], cQMetadata?: CQMetadata): {{ schema.aggregateName }}[]
    {
        if (!Array.isArray({{ toCamelCase schema.moduleNames }})) return;

        return {{ toCamelCase schema.moduleNames }}.map({{ toCamelCase schema.moduleName }}  => this.makeAggregate({{ toCamelCase schema.moduleName }}, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param {{ toCamelCase schema.moduleName }}
     */
    mapAggregateToResponse({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): {{ toPascalCase schema.moduleName }}Response
    {
        return this.makeResponse({{ toCamelCase schema.moduleName }});
    }

    /**
     * Map array of aggregates to array responses
     * @param {{ toCamelCase schema.moduleNames }}
     */
    mapAggregatesToResponses({{ toCamelCase schema.moduleNames }}: {{ schema.aggregateName }}[]): {{ toPascalCase schema.moduleName }}Response[]
    {
        if (!Array.isArray({{ toCamelCase schema.moduleNames }})) return;

        return {{ toCamelCase schema.moduleNames }}.map({{ toCamelCase schema.moduleName }} => this.makeResponse({{ toCamelCase schema.moduleName }}));
    }

    private makeAggregate({{ toCamelCase schema.moduleName }}: ObjectLiteral, cQMetadata?: CQMetadata): {{ schema.aggregateName }}
    {
        return {{ schema.aggregateName }}.register(
            {{#each schema.properties.mapper}}
            {{#if (allowProperty ../schema.moduleName this)}}
            {{#if hasTimezone}}
            new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}{{#if isI18n}}.{{ toCamelCase ../schema.moduleName }}{{> i18n }}{{/if}}.{{ toCamelCase name }}, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            {{else}}
            new {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}{{#if isI18n}}.{{ toCamelCase ../schema.moduleName }}{{> i18n }}{{/if}}.{{ toCamelCase name }}, { undefinable: true }),
            {{/if}}
            {{/if}}
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipModule }}Mapper({ eagerLoading: false }).mapModelToAggregate({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ ../schema.moduleName }}I18N.{{/if}}{{ toCamelCase relationshipField }}) : undefined,
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipModule }}Mapper({ eagerLoading: false }).mapModelToAggregate({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ ../schema.moduleName }}I18N.{{/if}}{{ toCamelCase nativeName }}) : undefined,
            {{/each}}
            {{#each schema.properties.withRelationshipManyToOne}}
            {{#unless (isI18NRelationProperty ../schema.moduleName this)}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipModule }}Mapper({ eagerLoading: false }).mapModelToAggregate({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ ../schema.moduleName }}I18N.{{/if}}{{ toCamelCase relationshipField }}) : undefined,
            {{/unless}}
            {{/each}}
            {{#each schema.properties.withRelationshipOneToMany}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipModule }}Mapper({ eagerLoading: false }).mapModelsToAggregates({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ ../schema.moduleName }}I18N.{{/if}}{{ toCamelCase nativeName }}) : undefined,
            {{/each}}
            {{#each schema.properties.withRelationshipManyToMany}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipModule }}Mapper({ eagerLoading: false }).mapModelsToAggregates({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ ../schema.moduleName }}I18N.{{/if}}{{ toCamelCase nativeName }}) : undefined,
            {{/each}}
        );
    }

    private makeResponse({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): {{ toPascalCase schema.moduleName }}Response
    {
        if (!{{ toCamelCase schema.moduleName }}) return;

        return new {{ toPascalCase schema.moduleName }}Response(
            {{#each schema.properties.mapper}}
            {{#if (allowProperty ../schema.moduleName this)}}
            {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}.value,
            {{/if}}
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithRelationshipField}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipModule }}Mapper({ eagerLoading: false }).mapAggregateToResponse({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase relationshipField }}) : undefined,
            {{/each}}
            {{#each schema.properties.withRelationshipOneToOneWithoutRelationshipField}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipModule }}Mapper({ eagerLoading: false }).mapAggregateToResponse({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase nativeName }}) : undefined,
            {{/each}}
            {{#each schema.properties.withRelationshipManyToOne}}
            {{#unless (isI18NRelationProperty ../schema.moduleName this)}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipModule }}Mapper({ eagerLoading: false }).mapAggregateToResponse({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase relationshipField }}) : undefined,
            {{/unless}}
            {{/each}}
            {{#each schema.properties.withRelationshipOneToMany}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipModule }}Mapper({ eagerLoading: false }).mapAggregatesToResponses({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase nativeName }}) : undefined,
            {{/each}}
            {{#each schema.properties.withRelationshipManyToMany}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipModule }}Mapper({ eagerLoading: false }).mapAggregatesToResponses({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase nativeName }}) : undefined,
            {{/each}}
        );
    }
}