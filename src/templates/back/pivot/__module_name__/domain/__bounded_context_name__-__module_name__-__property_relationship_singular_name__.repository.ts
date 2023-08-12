{{
    setVar 'importsArray' (
        array
            (object items=(array 'CQMetadata' 'IRepository' 'LiteralObject' 'Pagination' 'QueryStatement') path=config.auroraCorePackage)
            (object
                items=
                (
                    array
                        currentProperty.relationship.pivot.aggregate
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
            (
                object items=
                (
                        array
                            (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) (toPascalCase schema.moduleName) (toPascalCase schema.moduleName) 'Id')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/domain/value-objects')
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
export abstract class {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Repository implements IRepository<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }} | null>;

    // find a single record by id
    abstract findById(
        id: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}Id,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }} | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}[]>;

    // count records
    abstract count(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // ******************
    // ** side effects **
    // ******************

    // create a single record
    abstract create(
        role{{ toPascalCase currentProperty.relationship.singularName }}: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }},
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement: (aggregate: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        roles{{ toPascalCase currentProperty.relationship.singularName }}s: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        permission: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }},
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        role{{ toPascalCase currentProperty.relationship.singularName }}: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }},
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification elements already existing in the table
    abstract upsert(
        role{{ toPascalCase currentProperty.relationship.singularName }}: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }},
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}Id,
        options?: {
            deleteOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;

    // delete records
    abstract delete(
        options?: {
            deleteOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;
}
