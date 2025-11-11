/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamAccountModel } from '@app/iam/account';
import { IamRoleModel } from '@app/iam/role';
import {
    AuditingSideEffectEvent,
    SequelizeAuditingAgent,
} from '@aurorajs.dev/core';
import { DataTypes } from 'sequelize';
import {
    AfterBulkCreate,
    AfterBulkDestroy,
    AfterBulkRestore,
    AfterBulkUpdate,
    AfterCreate,
    AfterDestroy,
    AfterRestore,
    AfterUpdate,
    AfterUpsert,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';

@Table({
    modelName: 'IamRoleAccount',
    freezeTableName: true,
    timestamps: false,
})
export class IamRoleAccountModel extends Model<IamRoleAccountModel> {
    @AfterCreate
    static auditingCreate(instance: IamRoleAccountModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.CREATED,
            '@app/iam/role-account/infrastructure/sequelize/iam-sequelize-role-account.model',
            'IamRoleAccountModel',
        );
    }

    @AfterBulkCreate
    static auditingBulkCreate(instance: IamRoleAccountModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.BULK_CREATED,
            '@app/iam/role-account/infrastructure/sequelize/iam-sequelize-role-account.model',
            'IamRoleAccountModel',
        );
    }

    @AfterUpdate
    static auditingUpdate(instance: IamRoleAccountModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPDATED,
            '@app/iam/role-account/infrastructure/sequelize/iam-sequelize-role-account.model',
            'IamRoleAccountModel',
        );
    }

    @AfterBulkUpdate
    static auditingBulkUpdate(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_UPDATED,
            '@app/iam/role-account/infrastructure/sequelize/iam-sequelize-role-account.model',
            'IamRoleAccountModel',
        );
    }

    @AfterDestroy
    static auditingDestroy(instance: IamRoleAccountModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.DELETED,
            '@app/iam/role-account/infrastructure/sequelize/iam-sequelize-role-account.model',
            'IamRoleAccountModel',
        );
    }

    @AfterBulkDestroy
    static auditingBulkDestroy(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_DELETED,
            '@app/iam/role-account/infrastructure/sequelize/iam-sequelize-role-account.model',
            'IamRoleAccountModel',
        );
    }

    @AfterRestore
    static auditingRestore(instance: IamRoleAccountModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.RESTORED,
            '@app/iam/role-account/infrastructure/sequelize/iam-sequelize-role-account.model',
            'IamRoleAccountModel',
        );
    }

    @AfterBulkRestore
    static auditingBulkRestore(options): void {
        SequelizeAuditingAgent.registerSideEffect(
            null,
            options,
            AuditingSideEffectEvent.BULK_RESTORED,
            '@app/iam/role-account/infrastructure/sequelize/iam-sequelize-role-account.model',
            'IamRoleAccountModel',
        );
    }

    @AfterUpsert
    static auditingUpsert(instance: IamRoleAccountModel, options): void {
        SequelizeAuditingAgent.registerSideEffect(
            instance,
            options,
            AuditingSideEffectEvent.UPSERTED,
            '@app/iam/role-account/infrastructure/sequelize/iam-sequelize-role-account.model',
            'IamRoleAccountModel',
        );
    }

    @ForeignKey(() => IamRoleModel)
    @Column({
        field: 'roleId',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    roleId: string;

    @BelongsTo(() => IamRoleModel, {
        constraints: false,
        foreignKey: 'roleId',
    })
    role: IamRoleModel;

    @ForeignKey(() => IamAccountModel)
    @Column({
        field: 'accountId',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    accountId: string;

    @BelongsTo(() => IamAccountModel, {
        constraints: false,
        foreignKey: 'accountId',
    })
    account: IamAccountModel;
}
