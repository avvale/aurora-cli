{{
    setVar 'importsArray' (
        array
            (object items=(array 'Injectable') path='@nestjs/common')
            (object items=(array 'InjectModel') path='@nestjs/sequelize')
            (object items=(array 'AuditingRunner' 'ICriteria' 'SequelizeRepository') path=config.auroraCorePackage)
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName))
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Mapper')
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Model')
                        (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
    )
~}}
{{#hasItems (getRelationshipManyToManyProperties schema.aggregateProperties)  }}
{{
    push importsArray
        (object items='LiteralObject' path=config.auroraCorePackage)
~}}
{{/hasItems}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Sequelize{{ toPascalCase schema.moduleName }}Repository extends SequelizeRepository<{{ schema.aggregateName }}, {{ schema.aggregateName }}Model> implements {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository
{
    public readonly aggregateName: string = '{{ schema.aggregateName }}';
    public readonly mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        @InjectModel({{ schema.aggregateName }}Model)
        public readonly repository: typeof {{ schema.aggregateName }}Model,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
    {{#hasItems (getRelationshipManyToManyProperties schema.aggregateProperties)  }}

    // hook called after create aggregate
    async createdAggregateHook(
        aggregate: {{ schema.aggregateName }},
        model: {{ schema.aggregateName }}Model,
        createOptions: LiteralObject,
    ): Promise<void>
    {
        // add many to many relation
        {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
        if (aggregate.{{ toCamelCase (getNameProperty this) }}.length > 0)
        {
            await model.$add(
                '{{ toCamelCase name }}',
                aggregate.{{ toCamelCase (getNameProperty this) }}.value,
                createOptions,
            );
        }
        {{/each}}
    }

    // hook called after create aggregate
    async updatedByIdAggregateHook(
        aggregate: {{ schema.aggregateName }},
        model: {{ schema.aggregateName }}Model,
        updateByIdOptions: LiteralObject,
    ): Promise<void>
    {
        // set many to many relation
        {{#each (getRelationshipManyToManyProperties schema.aggregateProperties) }}
        if (aggregate.{{ toCamelCase (getNameProperty this) }}.isArray())
        {
            await model.$set(
                '{{ toCamelCase name }}',
                aggregate.{{ toCamelCase (getNameProperty this) }}.value,
                updateByIdOptions,
            );
        }
        {{/each}}
    }
    {{/hasItems}}
}
