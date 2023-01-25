/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Model } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model';
import { {{ currentProperty.relationshipAggregate }}Model } from '{{ config.appContainer }}/{{ currentProperty.relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase currentProperty.getRelationshipModule }}.model';

@Table({
    modelName: '{{ toPascalCase currentProperty.pivotAggregateName }}',
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

    @ForeignKey(() => {{ currentProperty.relationshipAggregate }}Model)
    @Column({
        field: '{{ toCamelCase currentProperty.getRelationshipModule }}Id',
        type: DataTypes.UUID,
    })
    {{ toCamelCase currentProperty.getRelationshipModule }}Id: string;
}