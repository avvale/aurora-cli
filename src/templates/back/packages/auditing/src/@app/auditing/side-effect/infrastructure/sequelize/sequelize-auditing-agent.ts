import { BadRequestException, Logger } from '@nestjs/common';
import { Utils } from '@aurora-ts/core';
import { AuditingSideEffectEvent } from '@api/graphql';
import { AuditingSideEffectModel } from './sequelize-side-effect.model';
import { AuditingMeta } from '@api/auditing/auditing.types';
import * as _ from 'lodash';

export class SequelizeAuditingAgent
{
    public static registerSideEffect(
        instance : any,
        options  : any,
        event    : AuditingSideEffectEvent,
        modelPath: string,
        modelName: string,
    ): void
    {
        const auditingMeta: AuditingMeta = options.auditing;

        if (!auditingMeta)
        {
            Logger.log(`Event ${event} of ${modelName} model, is not audited`);
            return;
        }

        let dataValues;
        let previousDataValues;

        // upsert return a array instances, but sequelize only allows upsert one record
        if (
            event === AuditingSideEffectEvent.UPSERTED &&
            Array.isArray(instance) &&
            instance.length > 0
        ) instance = instance[0];

        // manage instance data
        if (
            event === AuditingSideEffectEvent.CREATED ||
            event === AuditingSideEffectEvent.UPDATED ||
            event === AuditingSideEffectEvent.DELETED ||
            event === AuditingSideEffectEvent.RESTORED ||
            event === AuditingSideEffectEvent.UPSERTED
        )
        {
            if (
                !('dataValues' in instance) ||
                !('_previousDataValues' in instance)
            )
                throw new BadRequestException(`The instance for hook with event ${event} ane model ${modelName} does not defined.`);

            dataValues         = _.omit(instance.dataValues, ['createdAt', 'updatedAt', 'deletedAt']);
            previousDataValues = _.omit(instance._previousDataValues, ['createdAt', 'updatedAt', 'deletedAt']);
        }

        if (
            event === AuditingSideEffectEvent.BULK_CREATED
        )
        {
            if (
                Array.isArray(instance) &&
                instance.length > 0 &&
                !('dataValues' in instance[0]) ||
                !('_previousDataValues' in instance[0])
            )
                throw new BadRequestException(`The instance for hook with event ${event} ane model ${modelName} does not defined.`);

            dataValues         = instance.map(item => _.omit(item.dataValues, ['createdAt', 'updatedAt', 'deletedAt']));
            previousDataValues = instance.map(item => _.omit(instance._previousDataValues, ['createdAt', 'updatedAt', 'deletedAt']));
        }

        const now                        = Utils.nowTimestamp();
        let oldValue: any                = {};
        let newValue: any                = {};
        let auditableId;

        switch (event)
        {
            case AuditingSideEffectEvent.CREATED:
                newValue = dataValues;
                auditableId = dataValues.id;
                break;

            case AuditingSideEffectEvent.BULK_CREATED:
                newValue = dataValues;
                break;

            case AuditingSideEffectEvent.UPDATED:
                newValue = Utils.diff(SequelizeAuditingAgent.parseObject(dataValues), SequelizeAuditingAgent.parseObject(previousDataValues));
                oldValue = Utils.diff(SequelizeAuditingAgent.parseObject(previousDataValues), SequelizeAuditingAgent.parseObject(dataValues));
                auditableId = dataValues.id;
                break;

            case AuditingSideEffectEvent.DELETED:
                oldValue = dataValues;
                auditableId = dataValues.id;
                break;
        }

        AuditingSideEffectModel.create({
            id                  : auditingMeta.id ? auditingMeta.id : Utils.uuid(), // defined id when execute rollback to fill rollbackSideEffectId column
            modelPath,
            modelName,
            operationId         : auditingMeta.operationId,
            operationSort       : auditingMeta.operationSort,
            accountId           : auditingMeta.account.id,
            email               : auditingMeta.account.email,
            event,
            auditableId,
            oldValue,
            newValue,
            ip                  : auditingMeta.ip,
            method              : auditingMeta.method,
            baseUrl             : auditingMeta.baseUrl,
            params              : auditingMeta.params,
            query               : auditingMeta.query,
            body                : auditingMeta.body,
            userAgent           : auditingMeta.userAgent,
            tags                : auditingMeta.tags,
            isRollback          : false,
            rollbackSideEffectId: null,
            createdAt           : now,
            updatedAt           : now,
            deletedAt           : null,
        });
    }

    private static parseObject(object: any): any
    {
        return JSON.parse(JSON.stringify(object));
    }
}