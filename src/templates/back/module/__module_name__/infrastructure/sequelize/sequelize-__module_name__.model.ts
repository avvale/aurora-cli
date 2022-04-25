/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
{{#each schema.properties.withRelationshipOneToOne}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipManyToOne}}
{{#unless (isI18NRelationProperty ../schema.moduleName this)}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
{{/unless}}
{{/each}}
{{#each schema.properties.withRelationshipOneToMany}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
{{/each}}
{{#each schema.properties.withRelationshipManyToMany}}
import { {{ relationshipAggregate }}Model } from '{{#if relationshipPackageName }}{{ relationshipPackageName }}{{else}}../../../../../{{ config.applicationsContainer }}/{{ relationshipModulePath }}/infrastructure/sequelize/sequelize-{{ toKebabCase getRelationshipModule }}.model{{/if}}';
import { {{ pivotAggregateName }}Model } from '../../../../../{{ config.applicationsContainer }}/{{ pivotPath }}/infrastructure/sequelize/sequelize-{{ pivotFileName }}.model';
{{/each}}
{{#if schema.properties.hasI18n}}
import { {{ schema.aggregateName }}I18NModel } from './sequelize-{{ toKebabCase schema.moduleName }}-i18n.model';
{{/if}}

@Table({ modelName: '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}', freezeTableName: true, timestamps: false })
export class {{ schema.aggregateName }}Model extends Model<{{ schema.aggregateName }}Model>
{
    {{#each schema.properties.modelColumns}}
    {{#unless isI18n }}
    {{#if hasColumnDecorator }}
    {{#eq relationship ../relationship.ONE_TO_ONE }}
    @ForeignKey(() => {{ relationshipAggregate }}Model)
    {{/eq}}
    {{#eq relationship ../relationship.MANY_TO_ONE }}
    @ForeignKey(() => {{ relationshipAggregate }}Model)
    {{/eq}}
    {{#eq index 'index' }}
    {{! @Index :: https://github.com/RobinBuschmann/sequelize-typescript/issues/725 }}
    @Index
    {{/eq}}
    {{#eq index 'unique' }}
    {{#if indexName}}
    @Unique('{{ indexName }}')
    {{else}}
    @Unique
    {{/if}}
    {{/eq}}
    @Column({
        field: '{{ toCamelCase name }}',
        {{#if primaryKey }}
        primaryKey: {{ primaryKey }},
        {{/if}}
        allowNull: {{ nullable }},
        type: {{{ getSequelizeType }}},
        {{#if defaultValue }}
        defaultValue: {{ getDefaultValue }},
        {{/if}}
        {{#unless relationshipAvoidConstraint }}
        {{#eq relationship ../relationship.MANY_TO_ONE }}
        references: {
            key: '{{ getReferenceKey }}'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        {{/eq}}
        {{/unless}}
    })
    {{ toCamelCase name }}: {{{ getJavascriptType }}};
    {{/if}}
    {{#if hasHasOneDecorator }}

    @HasOne(() => {{ relationshipAggregate }}Model{{#or relationshipAvoidConstraint }}, {
        {{#if relationshipAvoidConstraint }}
        constraints: false,
        {{/if}}
    }{{/or}})
    {{ toCamelCase name }}: {{ relationshipAggregate }}Model;
    {{/if}}
    {{#if hasBelongsToDecorator }}

    @BelongsTo(() => {{ relationshipAggregate }}Model{{#or relationshipAvoidConstraint }}, {
        {{#if relationshipAvoidConstraint }}
        constraints: false,
        {{/if}}
    }{{/or}})
    {{ toCamelCase relationshipField }}: {{ relationshipAggregate }}Model;
    {{/if}}
    {{#if hasHasManyDecorator }}

    @HasMany(() => {{ relationshipAggregate }}Model{{#or relationshipKey relationshipAvoidConstraint }}, {
        {{#if relationshipKey }}
        foreignKey: '{{ relationshipKey }}',
        {{/if}}
        {{#if relationshipAvoidConstraint }}
        constraints: false,
        {{/if}}
    }{{/or}})
    {{ toCamelCase name }}: {{ relationshipAggregate }}Model[];
    {{/if}}
    {{#if hasBelongsToManyDecorator }}

    {{#if pivotAggregateName }}
    @BelongsToMany(() => {{ relationshipAggregate }}Model, {
        through: () => {{ pivotAggregateName }}Model,
        uniqueKey: 'Uq01{{ toPascalCase pivotAggregateName }}',
        {{#if relationshipAvoidConstraint }}
        constraints: false,
        {{/if}}
    })
    {{ toCamelCase nativeName }}: {{ relationshipAggregate }}Model[];
    {{else}}
    @BelongsToMany(() => {{ relationshipAggregate }}Model, {
        through: () => {{ pivotAggregateName }}Model,
        {{#if relationshipAvoidConstraint }}
        constraints: false,
        {{/if}}
    })
    {{ toCamelCase nativeName }}: {{ relationshipAggregate }}Model[];
    {{/if}}
    {{/if}}

    {{/unless}}
    {{/each}}
    {{#if schema.properties.hasI18n}}
    // i18n relation
    @HasOne(() => {{ schema.aggregateName }}I18NModel, { as: '{{ schema.moduleName }}I18N' })
    {{ toCamelCase schema.moduleName }}I18N: {{ schema.aggregateName }}I18NModel;
    {{/if}}
}