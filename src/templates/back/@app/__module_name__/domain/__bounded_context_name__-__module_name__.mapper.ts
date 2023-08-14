import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '{{ config.auroraCorePackage }}';
import { {{ schema.aggregateName }} } from './{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response } from './{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.response';
import {
    {{> importValueObjects }}
} from './value-objects';
{{#each schema.aggregateProperties.withImportRelationshipOneToOne}}
import { {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipManyToOne}}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
import { {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/unless}}
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipOneToMany}}
import { {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipManyToMany}}
import { {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}

export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param {{ toCamelCase schema.moduleName }}
     */
    mapModelToAggregate({{ toCamelCase schema.moduleName }}: LiteralObject, cQMetadata?: CQMetadata): {{ schema.aggregateName }}
    {
        if (!{{ toCamelCase schema.moduleName }}) return;

        return this.makeAggregate({{ toCamelCase schema.moduleName }}, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param {{ toCamelCase schema.moduleNames }}
     */
    mapModelsToAggregates({{ toCamelCase schema.moduleNames }}: LiteralObject[], cQMetadata?: CQMetadata): {{ schema.aggregateName }}[]
    {
        if (!Array.isArray({{ toCamelCase schema.moduleNames }})) return;

        return {{ toCamelCase schema.moduleNames }}.map({{ toCamelCase schema.moduleName }} => this.makeAggregate({{ toCamelCase schema.moduleName }}, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param {{ toCamelCase schema.moduleName }}
     */
    mapAggregateToResponse({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response
    {
        return this.makeResponse({{ toCamelCase schema.moduleName }});
    }

    /**
     * Map array of aggregates to array responses
     * @param {{ toCamelCase schema.moduleNames }}
     */
    mapAggregatesToResponses({{ toCamelCase schema.moduleNames }}: {{ schema.aggregateName }}[]): {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response[]
    {
        if (!Array.isArray({{ toCamelCase schema.moduleNames }})) return;

        return {{ toCamelCase schema.moduleNames }}.map({{ toCamelCase schema.moduleName }} => this.makeResponse({{ toCamelCase schema.moduleName }}));
    }

    private makeAggregate({{ toCamelCase schema.moduleName }}: LiteralObject, cQMetadata?: CQMetadata): {{ schema.aggregateName }}
    {
        return {{ schema.aggregateName }}.register(
            {{#each schema.aggregateProperties.mapper}}
            {{#if (isAllowProperty ../schema.moduleName this)}}
            {{#if hasTimezone}}
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}{{#if isI18n}}.{{ toCamelCase ../schema.moduleName }}{{> i18n }}{{/if}}.{{ toCamelCase name }}, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            {{else}}
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleName }}{{#if isI18n}}.{{ toCamelCase ../schema.moduleName }}{{> i18n }}{{/if}}.{{ toCamelCase name }}, { undefinable: true }),
            {{/if}}
            {{/if}}
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToOneWithRelationshipField}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper({ eagerLoading: true }).mapModelToAggregate({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ toCamelCase ../schema.moduleName }}I18n.{{/if}}{{ toCamelCase relationship.field }}, cQMetadata) : undefined,
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToOneWithoutRelationshipField}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper({ eagerLoading: true }).mapModelToAggregate({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ toCamelCase ../schema.moduleName }}I18n.{{/if}}{{ toCamelCase originName }}, cQMetadata) : undefined,
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipManyToOne}}
            {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper({ eagerLoading: true }).mapModelToAggregate({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ toCamelCase ../schema.moduleName }}I18n.{{/if}}{{ toCamelCase relationship.field }}, cQMetadata) : undefined,
            {{/unless}}
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToMany}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper({ eagerLoading: true }).mapModelsToAggregates({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ toCamelCase ../schema.moduleName }}I18n.{{/if}}{{ toCamelCase originName }}, cQMetadata) : undefined,
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipManyToMany}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper({ eagerLoading: true }).mapModelsToAggregates({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ toCamelCase ../schema.moduleName }}I18n.{{/if}}{{ toCamelCase originName }}, cQMetadata) : undefined,
            {{/each}}
        );
    }

    private makeResponse({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response
    {
        if (!{{ toCamelCase schema.moduleName }}) return;

        return new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response(
            {{#each schema.aggregateProperties.mapper}}
            {{#if (isAllowProperty ../schema.moduleName this)}}
            {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}.value,
            {{/if}}
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToOneWithRelationshipField}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper({ eagerLoading: true }).mapAggregateToResponse({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase relationship.field }}) : undefined,
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToOneWithoutRelationshipField}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper({ eagerLoading: true }).mapAggregateToResponse({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase originName }}) : undefined,
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipManyToOne}}
            {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper({ eagerLoading: true }).mapAggregateToResponse({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase relationship.field }}) : undefined,
            {{/unless}}
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipOneToMany}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper({ eagerLoading: true }).mapAggregatesToResponses({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase originName }}) : undefined,
            {{/each}}
            {{#each schema.aggregateProperties.withRelationshipManyToMany}}
            this.options.eagerLoading ? new {{ toPascalCase getRelationshipBoundedContextName }}{{ toPascalCase getRelationshipModuleName }}Mapper({ eagerLoading: true }).mapAggregatesToResponses({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase originName }}) : undefined,
            {{/each}}
        );
    }
}
