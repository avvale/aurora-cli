/* eslint-disable indent */
/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'Column' 'Model' 'Table' 'ForeignKey') path='sequelize-typescript')
            (object items='DataTypes' path='sequelize')
            (object
                items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Model')
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
            (object
                items=(sumStrings currentProperty.relationship.aggregate 'Model')
                path=(sumStrings config.appContainer '/' currentProperty.relationship.modulePath)
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
@Table({
    modelName: '{{ toPascalCase currentProperty.relationship.pivot.aggregate }}',
    freezeTableName: true,
    timestamps: false,
})
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Model extends Model<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}{{ toPascalCase currentProperty.relationship.singularName }}Model>
{
    @ForeignKey(() => {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Model)
    @Column({
        field: '{{ toCamelCase schema.moduleName }}Id',
        type: DataTypes.UUID,
    })
    {{ toCamelCase schema.moduleName }}Id: string;

    @ForeignKey(() => {{ currentProperty.relationship.aggregate }}Model)
    @Column({
        field: '{{ toCamelCase currentProperty.relationship.singularName }}Id',
        type: DataTypes.UUID,
    })
    {{ toCamelCase currentProperty.relationship.singularName }}Id: string;
}