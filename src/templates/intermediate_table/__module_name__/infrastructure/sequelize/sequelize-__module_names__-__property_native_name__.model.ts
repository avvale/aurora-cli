import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Model } from '@hades/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/sequelize-{{ toKebabCase schema.moduleName }}.model';
import { {{ currentProperty.relationshipAggregate }}Model } from '@hades/{{ currentProperty.relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase currentProperty.getRelationshipModule }}.model';

@Table({ modelName: '{{ toPascalCase currentProperty.intermediateTable }}', freezeTableName: true, timestamps: false })
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.nativeName }}Model extends Model<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleNames }}{{ toPascalCase currentProperty.nativeName }}Model>
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