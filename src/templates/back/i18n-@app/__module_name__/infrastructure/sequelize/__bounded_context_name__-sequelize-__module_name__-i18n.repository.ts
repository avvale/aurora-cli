{{
    setVar 'importsArray' (
        array
            (object items=(array 'Injectable') path='@nestjs/common')
            (object items=(array 'InjectModel') path='@nestjs/sequelize')
            (object items=(array 'AuditingRunner' 'ICriteria' 'SequelizeRepository') path=config.auroraCorePackage)
            (object
                items=(
                    array
                        schema.aggregateName
                        (sumStrings schema.aggregateName 'I18nModel')
                        (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'I18nRepository')
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Mapper')
                )
                path=(
                    sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)
                )
            )
    )
~}}
{{#hasItems (getRelationshipManyToManyProperties schema.aggregateProperties)  }}
{{ push importsArray
    (object items='LiteralObject' path=config.auroraCorePackage)
~}}
{{/hasItems}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Sequelize{{ toPascalCase schema.moduleName }}I18nRepository extends SequelizeRepository<{{ schema.aggregateName }}, {{ schema.aggregateName }}I18nModel> implements {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository
{
    public readonly aggregateName: string = '{{ schema.aggregateName }}';
    public readonly mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        @InjectModel({{ schema.aggregateName }}I18nModel)
        public readonly repository: typeof {{ schema.aggregateName }}I18nModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}