/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items='LiteralObject' path=config.auroraCorePackage)
            (object items='AggregateRoot' path='@nestjs/cqrs')
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
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }} extends AggregateRoot
{
    {{ toCamelCase schema.moduleName }}Id: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}Id;
    {{ toCamelCase currentProperty.relationship.singularName }}Id: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Id;

    constructor({{ toCamelCase schema.moduleName }}Id?: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}Id, {{ toCamelCase currentProperty.relationship.singularName }}Id?: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Id)
    {
        super();

        this.{{ toCamelCase schema.moduleName }}Id = {{ toCamelCase schema.moduleName }}Id;
        this.{{ toCamelCase currentProperty.relationship.singularName }}Id = {{ toCamelCase currentProperty.relationship.singularName }}Id;
    }

    static register({{ toCamelCase schema.moduleName }}Id: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}Id, {{ toCamelCase currentProperty.relationship.singularName }}Id: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Id): {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}
    {
        return new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}({{ toCamelCase schema.moduleName }}Id, {{ toCamelCase currentProperty.relationship.singularName }}Id);
    }

    toDTO(): LiteralObject
    {
        return {
            {{ toCamelCase schema.moduleName }}Id: this.{{ toCamelCase schema.moduleName }}Id.value,
            {{ toCamelCase currentProperty.relationship.singularName }}Id: this.{{ toCamelCase currentProperty.relationship.singularName }}Id.value,
        };
    }

    toRepository(): LiteralObject
    {
        return {
            {{ toCamelCase schema.moduleName }}Id: this.{{ toCamelCase schema.moduleName }}Id.value,
            {{ toCamelCase currentProperty.relationship.singularName }}Id: this.{{ toCamelCase currentProperty.relationship.singularName }}Id.value,
        };
    }
}
