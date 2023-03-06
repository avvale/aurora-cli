import { Injectable } from '@nestjs/common';
import { AuditingMeta, AuditingRunner, Utils } from '@aurora-ts/core';
import { AuditingSideEffectModel } from '@app/auditing/side-effect';

@Injectable()
export class AuditingRunnerAuroraImplementationService extends AuditingRunner
{
    create(
        auditingMeta: AuditingMeta,
        now: string,
        event: string,
        modelPath: string,
        modelName: string,
        auditableId: string,
        oldValue: any,
        newValue: any,
    ): void
    {
        AuditingSideEffectModel.create({
            id                  : auditingMeta.id ? auditingMeta.id : Utils.uuid(), // defined id when execute rollback to fill rollbackSideEffectId column
            tags                : auditingMeta.tags,
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
            isRollback          : false,
            rollbackSideEffectId: null,
            createdAt           : now,
            updatedAt           : now,
            deletedAt           : null,
        });
    }
}