/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Model } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}';
import { {{ currentProperty.relationship.aggregateName }}Model } from '{{ config.appContainer }}/{{ currentProperty.relationship.modulePath }}';

@Table({
    modelName: '{{ toPascalCase currentProperty.relationship.pivot.aggregate }}',
    freezeTableName: true,
    timestamps: false,
})
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.name }}Model extends Model<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.name }}Model>
{
    @ForeignKey(() => {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Model)
    @Column({
        field: '{{ toCamelCase schema.moduleName }}Id',
        type: DataTypes.UUID,
    })
    {{ toCamelCase schema.moduleName }}Id: string;

    @ForeignKey(() => {{ currentProperty.relationship.aggregateName }}Model)
    @Column({
        field: '{{ toCamelCase (getModuleNameFromPropertyRelationship currentProperty.relationship.modulePath) }}Id',
        type: DataTypes.UUID,
    })
    {{ toCamelCase (getModuleNameFromPropertyRelationship currentProperty.relationship.modulePath) }}Id: string;
}