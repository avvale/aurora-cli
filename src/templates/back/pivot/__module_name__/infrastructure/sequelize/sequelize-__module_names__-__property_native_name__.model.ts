/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Model } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model';
import { {{ currentProperty.relationship.aggregate }}Model } from '{{ config.appContainer }}/{{ currentProperty.relationship.modulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase currentProperty.getRelationshipModule }}.model';

@Table({
    modelName: '{{ toPascalCase currentProperty.relationship.pivot.aggregate }}',
    freezeTableName: true,
    timestamps: false,
})
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}Model extends Model<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.originName }}Model>
{
    @ForeignKey(() => {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Model)
    @Column({
        field: '{{ toCamelCase schema.moduleName }}Id',
        type: DataTypes.UUID,
    })
    {{ toCamelCase schema.moduleName }}Id: string;

    @ForeignKey(() => {{ currentProperty.relationship.aggregate }}Model)
    @Column({
        field: '{{ toCamelCase currentProperty.getRelationshipModule }}Id',
        type: DataTypes.UUID,
    })
    {{ toCamelCase currentProperty.getRelationshipModule }}Id: string;
}