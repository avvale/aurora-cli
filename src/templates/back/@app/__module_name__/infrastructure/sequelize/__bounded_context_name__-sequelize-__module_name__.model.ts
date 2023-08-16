/* eslint-disable indent */
/* eslint-disable key-spacing */
{{#if schema.hasAuditing}}
import { AuditingSideEffectEvent, SequelizeAuditingAgent } from '@aurorajs.dev/core';
{{/if}}
import { {{#if schema.hasAuditing}}AfterBulkCreate, AfterBulkDestroy, AfterBulkRestore, AfterBulkUpdate, AfterCreate, AfterDestroy, AfterRestore, AfterUpdate, AfterUpsert, {{/if}}Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
{{#each (getWithImportRelationshipOneToOneProperties schema.aggregateProperties) }}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ ../config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each (getWithImportRelationshipManyToOneProperties schema.aggregateProperties) }}
{{#unless (isI18nRelationProperty ../schema.moduleName this)}}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ ../config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/unless}}
{{/each}}
{{#each (getWithImportRelationshipOneToManyProperties schema.aggregateProperties) }}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ ../config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
{{/each}}
{{#each (getWithImportRelationshipManyToManyProperties schema.aggregateProperties)}}
import { {{ relationship.aggregateName }}Model } from '{{#if relationship.packageName }}{{ relationship.packageName }}{{else}}{{ ../config.appContainer }}/{{ relationship.modulePath }}{{/if}}';
import { {{ relationship.pivot.aggregateName }}Model } from '{{ ../config.appContainer }}/{{ relationship.pivot.modulePath }}';
{{/each}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
import { {{ schema.aggregateName }}I18nModel } from './{{ toKebabCase schema.boundedContextName }}-sequelize-{{ toKebabCase schema.moduleName }}-i18n.model';
{{/if}}

@Table({
    modelName: '{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}',
    freezeTableName: true,
    timestamps: false,
    {{#if (hasIndexProperties schema.aggregateProperties) }}
    indexes: [
{{{
    indexesManager (
        object
            indexes=(getIndexesProperties schema.aggregateProperties)
            isI18n=false
    )
}}}
    ],
    {{/if}}
})
export class {{ schema.aggregateName }}Model extends Model<{{ schema.aggregateName }}Model>
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
    {{#each schema.aggregateProperties }}
    {{#unless isI18n }}
    {{#if (hasColumnDecoratorProperty this) }}
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
        type: {{{ getSequelizeTypeProperty this ../config }}},
        {{#unless (isUndefined defaultValue) }}
        defaultValue: {{{ getDefaultValueProperty this }}},
        {{/unless}}
        {{#unless relationship.avoidConstraint }}
        {{#eq relationship.type ../relationshipType.MANY_TO_ONE }}
        references: {
            key: '{{ getReferenceKey }}',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        {{/eq}}
        {{/unless}}
    })
    {{ toCamelCase (getNameProperty this) }}: {{{ getJavascriptModelTypeProperty this ../config }}};
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
    {{ toCamelCase name }}: {{ relationship.aggregateName }}Model[];
    {{#if relationship.isDenormalized }}

    @Column({
        field: '{{ toCamelCase relationship.singularName }}Ids',
        allowNull: {{ nullable }},
        type: DataTypes.JSON,
        {{#unless (isUndefined defaultValue) }}
        defaultValue: {{{ getDefaultValueProperty this }}},
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
    {{ toCamelCase name }}: {{ relationship.aggregateName }}Model[];
    {{/if}}
    {{/if}}

    {{/unless}}
    {{/each}}
    {{#if (hasI18nProperties schema.aggregateProperties) }}
    // i18n relation
    @HasOne(() => {{ schema.aggregateName }}I18nModel, { as: '{{ toCamelCase schema.moduleName }}I18n' })
    {{ toCamelCase schema.moduleName }}I18n: {{ schema.aggregateName }}I18nModel;
    {{/if}}
}
