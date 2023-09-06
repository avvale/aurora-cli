/* eslint-disable no-unused-vars */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'IMapper' 'LiteralObject' 'MapperOptions') path=config.auroraCorePackage)
            (object items=currentProperty.relationship.pivot.aggregate path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
            (
                object items=
                (
                        array
                            (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase schema.moduleName) (toPascalCase schema.moduleName) 'Id')
                            (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase schema.moduleName) (toPascalCase currentProperty.relationship.singularName) 'Id')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/domain/value-objects')
                oneRowByItem=true
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Mapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param {{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}
     */
    mapModelToAggregate({{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}: LiteralObject): {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}
    {
        if (!{{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}) return;

        return this.makeAggregate({{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }});
    }

    /**
     * Map array of objects to array aggregates
     * @param {{ toCamelCase schema.moduleNames }}{{ toPascalCase currentProperty.relationship.singularName }}s
     */
    mapModelsToAggregates({{ toCamelCase schema.moduleNames }}{{ toPascalCase currentProperty.name }}: LiteralObject[]): {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}[]
    {
        if (!Array.isArray({{ toCamelCase schema.moduleNames }}{{ toPascalCase currentProperty.relationship.singularName }}s)) return;

        return {{ toCamelCase schema.moduleNames }}{{ toPascalCase currentProperty.relationship.singularName }}s.map({{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}  => this.makeAggregate({{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}));
    }

    mapAggregateToResponse({{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}: {{ currentProperty.relationship.pivot.aggregate }}): LiteralObject
    {
        return null;
    }

    mapAggregatesToResponses({{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}: {{ currentProperty.relationship.pivot.aggregate }}[]): LiteralObject[]
    {
        return null;
    }

    private makeAggregate({{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}: LiteralObject): {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}
    {
        return {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}.register(
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}Id({{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}.{{ toCamelCase schema.moduleName }}Id),
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Id({{ toCamelCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}.accountId),
        );
    }
}