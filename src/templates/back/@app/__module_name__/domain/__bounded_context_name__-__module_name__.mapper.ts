{{#each (getWithImportRelationshipOneToOneProperties schema.aggregateProperties) }}
import { {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ ../config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each (getWithImportRelationshipManyToOneProperties schema.aggregateProperties) }}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
import { {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ ../config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/unless}}
{{/each}}
{{#each (getWithImportRelationshipOneToManyProperties schema.aggregateProperties) }}
import { {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ ../config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each (getWithImportRelationshipManyToManyProperties schema.aggregateProperties)}}
import { {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ ../config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}

{{
    setVar 'importsArray' (
        array
            (object items=(array 'CQMetadata' 'IMapper' 'LiteralObject' 'MapperOptions') path=config.auroraCorePackage)
            (
                object
                    items=
                    (
                        array
                            (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName))
                            (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Response')
                    )
                    path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
    )
~}}
{{#each (getWithImportRelationshipOneToOneProperties schema.aggregateProperties) }}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
            items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/each}}
{{#each (getWithImportRelationshipManyToOneProperties schema.aggregateProperties) }}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/unless}}
{{/each}}
{{#each (getWithImportRelationshipOneToManyProperties schema.aggregateProperties) }}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
            items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/each}}
{{#each (getWithImportRelationshipManyToManyProperties schema.aggregateProperties) }}
{{#if relationship.packageName}}
{{
    push ../importsArray
        (
            object
                items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=relationship.packageName
        )
~}}
{{else}}
{{
    push ../importsArray
        (
            object
            items=(sumStrings (toPascalCase schema.getRelationshipBoundedContextNameProperty) (toPascalCase schema.getRelationshipModuleNameProperty))
                path=(sumStrings ../config.appContainer '/' relationship.modulePath)
        )
~}}
{{/if}}
{{/each}}
{{#each (getValueObjectsProperties schema.aggregateProperties) }}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../importsArray
        (object 
            items=
                (sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase (getPropertyName this)))
                path=(sumStrings ../config.appContainer '/' (toKebabCase ../schema.boundedContextName) '/' (toKebabCase ../schema.moduleName) '/domain/value-objects')
                oneRowByItem=true
        )
~}}
{{/if}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
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
            {{#each (getMapperProperties schema.aggregateProperties) }}
            {{#if (isAllowProperty ../schema.moduleName this)}}
            {{#if (isTimezoneProperty this) }}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getPropertyName this) }}({{ toCamelCase ../schema.moduleName }}{{#if isI18n}}.{{ toCamelCase ../schema.moduleName }}{{> i18n }}{{/if}}.{{ toCamelCase (getPropertyName this) }}, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            {{else}}
            new {{ toPascalCase ../schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getPropertyName this) }}({{ toCamelCase ../schema.moduleName }}{{#if isI18n}}.{{ toCamelCase ../schema.moduleName }}{{> i18n }}{{/if}}.{{ toCamelCase (getPropertyName this) }}, { undefinable: true }),
            {{/if}}
            {{/if}}
            {{/each}}
            {{#each (getWithRelationshipOneToOneWithRelationshipFieldProperties schema.aggregateProperties) }}
            this.options.eagerLoading ? new {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper({ eagerLoading: true }).mapModelToAggregate({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ toCamelCase ../schema.moduleName }}I18n.{{/if}}{{ toCamelCase relationship.field }}, cQMetadata) : undefined,
            {{/each}}
            {{#each (getWithRelationshipOneToOneWithoutRelationshipFieldProperties schema.aggregateProperties) }}
            this.options.eagerLoading ? new {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper({ eagerLoading: true }).mapModelToAggregate({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ toCamelCase ../schema.moduleName }}I18n.{{/if}}{{ toCamelCase name }}, cQMetadata) : undefined,
            {{/each}}
            {{#each (getWithRelationshipManyToOneProperties schema.aggregateProperties) }}
            {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
            this.options.eagerLoading ? new {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper({ eagerLoading: true }).mapModelToAggregate({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ toCamelCase ../schema.moduleName }}I18n.{{/if}}{{ toCamelCase relationship.field }}, cQMetadata) : undefined,
            {{/unless}}
            {{/each}}
            {{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
            this.options.eagerLoading ? new {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper({ eagerLoading: true }).mapModelsToAggregates({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ toCamelCase ../schema.moduleName }}I18n.{{/if}}{{ toCamelCase name }}, cQMetadata) : undefined,
            {{/each}}
            {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
            this.options.eagerLoading ? new {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper({ eagerLoading: true }).mapModelsToAggregates({{ toCamelCase ../schema.moduleName }}.{{#if isI18n}}{{ toCamelCase ../schema.moduleName }}I18n.{{/if}}{{ toCamelCase name }}, cQMetadata) : undefined,
            {{/each}}
        );
    }

    private makeResponse({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response
    {
        if (!{{ toCamelCase schema.moduleName }}) return;

        return new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response(
            {{#each (getMapperProperties schema.aggregateProperties) }}
            {{#if (isAllowProperty ../schema.moduleName this)}}
            {{ toCamelCase ../schema.moduleName }}.{{ toCamelCase (getPropertyName this) }}.value,
            {{/if}}
            {{/each}}
            {{#each (getWithRelationshipOneToOneWithRelationshipFieldProperties schema.aggregateProperties) }}
            this.options.eagerLoading ? new {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper({ eagerLoading: true }).mapAggregateToResponse({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase relationship.field }}) : undefined,
            {{/each}}
            {{#each (getWithRelationshipOneToOneWithoutRelationshipFieldProperties schema.aggregateProperties) }}
            this.options.eagerLoading ? new {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper({ eagerLoading: true }).mapAggregateToResponse({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}) : undefined,
            {{/each}}
            {{#each (getWithRelationshipManyToOneProperties schema.aggregateProperties) }}
            {{#unless (isI18nRelationProperty ../schema.moduleName this)}}
            this.options.eagerLoading ? new {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper({ eagerLoading: true }).mapAggregateToResponse({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase relationship.field }}) : undefined,
            {{/unless}}
            {{/each}}
            {{#each (getWithRelationshipOneToManyProperties schema.aggregateProperties) }}
            this.options.eagerLoading ? new {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper({ eagerLoading: true }).mapAggregatesToResponses({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}) : undefined,
            {{/each}}
            {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
            this.options.eagerLoading ? new {{ toPascalCase (getRelationshipBoundedContextNameProperty this ../schema) }}{{ toPascalCase (getRelationshipModuleNameProperty this ../schema) }}Mapper({ eagerLoading: true }).mapAggregatesToResponses({{ toCamelCase ../schema.moduleName }}.{{ toCamelCase name }}) : undefined,
            {{/each}}
        );
    }
}
