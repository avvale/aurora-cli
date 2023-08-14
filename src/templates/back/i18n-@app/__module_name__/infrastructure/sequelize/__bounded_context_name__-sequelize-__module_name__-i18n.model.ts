/* eslint-disable indent */
/* eslint-disable key-spacing */
{{#if schema.hasAuditing}}
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
{{/if}}
import { {{#if schema.hasAuditing}}AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, {{/if}}Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
{{#each schema.aggregateProperties.withRelationshipOneToOne}}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each schema.aggregateProperties.withImportRelationshipManyToOne}}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each schema.aggregateProperties.withRelationshipOneToMany}}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each schema.aggregateProperties.withRelationshipManyToMany}}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
import { {{ relationship.pivot.aggregate }}Model } from '{{ config.appContainer }}/{{ relationship.pivot.modulePath }}';
{{/each}}

@Table({
    modelName: '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}I18n',
    freezeTableName: true,
    timestamps: false,
    {{#if schema.aggregateProperties.hasIndexI18n}}
    indexes: [
{{{
    indexesManager (
        object
            indexes=schema.aggregateProperties.columnsWithIndex
            isI18n=true
    )
}}}
    ],
    {{/if}}
})
export class {{ schema.aggregateName }}I18nModel extends Model<{{ schema.aggregateName }}I18nModel>
{
    {{#if schema.hasAuditing}}
    @AfterCreate
    static auditingCreate(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterRestore
    static auditingRestore(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: {{ schema.aggregateName }}Model, options): void
    {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/sequelize/{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}.model',
            '{{ schema.aggregateName }}Model',
        );
    }

    {{/if}}
    {{#each schema.aggregateProperties.modelColumns}}
    {{#if isI18n }}
    {{#if hasColumnDecorator }}
    {{#eq relationship.type ../relationshipType.ONE_TO_ONE }}
    @ForeignKey(() => {{ relationship.aggregateName }}Model)
    {{/eq}}
    {{#eq relationship.type ../relationshipType.MANY_TO_ONE }}
    @ForeignKey(() => {{ relationship.aggregateName }}Model)
    {{/eq}}
    @Column({
        field: '{{ toCamelCase (getNameProperty this) }}',
        {{#if primaryKey }}
        primaryKey: {{ primaryKey }},
        {{/if}}
        {{#if autoIncrement }}
        autoIncrement: {{ autoIncrement }},
        {{/if}}
        allowNull: {{ nullable }},
        type: {{{ getSequelizeType }}},
        {{#unless (isUndefined defaultValue) }}
        defaultValue: {{{ getDefaultValue }}},
        {{/unless}}
        {{#unless relationship.avoidConstraint }}
        {{#eq relationship.type ../relationshipType.MANY_TO_ONE }}
        references: {
            key: '{{ getReferenceKey }}',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        {{/eq}}
        {{/unless}}
    })
    {{ toCamelCase (getNameProperty this) }}: {{{ getJavascriptType }}};
    {{/if}}
    {{#if hasHasOneDecorator }}

    @HasOne(() => {{ relationship.aggregateName }}Model{{#or relationship.avoidConstraint }}, {
        {{#if relationship.avoidConstraint }}
        constraints: false,
        {{/if}}
    }{{/or}})
    {{ toCamelCase (getNameProperty this) }}: {{ relationship.aggregateName }}Model;
    {{/if}}
    {{#if hasBelongsToDecorator }}

    @BelongsTo(() => {{ relationship.aggregateName }}Model{{#or relationship.avoidConstraint }}, {
        {{#if relationship.avoidConstraint }}
        constraints: false,
        {{/if}}
        foreignKey: '{{ toCamelCase (getNameProperty this) }}',
    }{{/or}})
    {{ toCamelCase relationship.field }}: {{ relationship.aggregateName }}Model;
    {{/if}}
    {{#if hasHasManyDecorator }}

    @HasMany(() => {{ relationship.aggregateName }}Model{{#or relationship.key relationship.avoidConstraint }}, {
        {{#if relationship.key }}
        foreignKey: '{{ relationship.key }}',
        {{/if}}
        {{#if relationship.avoidConstraint }}
        constraints: false,
        {{/if}}
    }{{/or}})
    {{ toCamelCase (getNameProperty this) }}: {{ relationship.aggregateName }}Model[];
    {{/if}}
    {{#if hasBelongsToManyDecorator }}

    {{#if relationship.pivot.aggregate }}
    @BelongsToMany(() => {{ relationship.aggregateName }}Model, {
        through: () => {{ relationship.pivot.aggregate }}Model,
        uniqueKey: 'Uq01{{ toPascalCase relationship.pivot.aggregate }}',
        {{#if relationship.avoidConstraint }}
        constraints: false,
        {{/if}}
    })
    {{ toCamelCase originName }}: {{ relationship.aggregateName }}Model[];
    {{#if relationship.isDenormalized }}

    @Column({
        field: '{{ toCamelCase relationship.singularName }}Ids',
        allowNull: {{ nullable }},
        type: DataTypes.JSON,
        {{#unless (isUndefined defaultValue) }}
        defaultValue: {{{ getDefaultValue }}},
        {{/unless}}
    })
    {{ toCamelCase (getNameProperty this) }}: any;
    {{/if}}
    {{else}}
    @BelongsToMany(() => {{ relationship.aggregateName }}Model, {
        through: () => {{ relationship.pivot.aggregate }}Model,
        {{#if relationship.avoidConstraint }}
        constraints: false,
        {{/if}}
    })
    {{ toCamelCase originName }}: {{ relationship.aggregateName }}Model[];
    {{/if}}
    {{/if}}

    {{/if}}
    {{/each}}
}