{{
    setVar 'importsArray' (
        array
            (object items=(array 'AuditingRunner' 'ICriteria' 'SequelizeRepository') path=config.auroraCorePackage)
            (object items='Injectable' path='@nestjs/common')
            (object items='InjectModel' path='@nestjs/sequelize')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase currentProperty.relationship.singularName))
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase currentProperty.relationship.singularName) 'Mapper')
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase currentProperty.relationship.singularName) 'Model')
                        (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) (toPascalCase currentProperty.relationship.singularName) 'Repository')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Sequelize{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Repository extends SequelizeRepository<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}, {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Model> implements {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Repository
{
    public readonly aggregateName: string = '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}';
    public readonly mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Mapper();

    constructor(
        @InjectModel({{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Model)
        public readonly repository: typeof {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Model,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}