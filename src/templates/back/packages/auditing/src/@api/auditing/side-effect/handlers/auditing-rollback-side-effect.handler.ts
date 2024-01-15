import { AuditingUpdateSideEffectByIdDto } from '../dto';
import { AuditingSideEffectEvent, AuditingUpdateSideEffectByIdInput } from '@api/graphql';
import { AuditingMeta, AuditingRunner, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuditingFindSideEffectByIdQuery, AuditingUpdateSideEffectByIdCommand } from '@app/auditing/side-effect';
import * as path from 'node:path';

@Injectable()
export class AuditingRollbackSideEffectHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly auditingRunner: AuditingRunner,
    ) {}

    async main(
        payload: AuditingUpdateSideEffectByIdInput | AuditingUpdateSideEffectByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        const sideEffect           = await this.queryBus.ask(new AuditingFindSideEffectByIdQuery(payload.id, constraint, { timezone }));
        const modelPath            = path.join('..', '..', '..', '..', sideEffect.modelPath);
        const now                  = Utils.nowTimestamp();
        const rollbackSideEffectId = Utils.uuid();
        const m                    = await import(modelPath);

        // set id for rollback side effect
        auditing = {
            ...auditing,
            id: rollbackSideEffectId,
        };

        switch (sideEffect.event)
        {
            case AuditingSideEffectEvent.CREATED:
                const objectCreated = await m[sideEffect.modelName]
                    .findByPk(sideEffect.auditableId);

                // eslint-disable-next-line max-len
                if (!objectCreated)
                    throw new BadRequestException(`The object from model ${sideEffect.modelName} with id ${sideEffect.auditableId} no longer exists in the database`);

                await objectCreated.destroy({
                    auditing: {
                        ...auditing,
                        auditingRunner: this.auditingRunner,
                    },
                });
                break;

            case AuditingSideEffectEvent.UPDATED:
                const objectUpdated = await m[sideEffect.modelName]
                    .findByPk(sideEffect.auditableId);

                // eslint-disable-next-line max-len
                if (!objectUpdated) throw new BadRequestException(`The object from model ${sideEffect.modelName} with id ${sideEffect.auditableId} no longer exists in the database`);

                await objectUpdated
                    .update(
                        {
                            ...sideEffect.oldValue,
                            updatedAt: now,
                        },
                        {
                            auditing: {
                                ...auditing,
                                auditingRunner: this.auditingRunner,
                            },
                        },
                    );
                break;

            case AuditingSideEffectEvent.DELETED:
                await m[sideEffect.modelName]
                    .create(
                        {
                            ...sideEffect.oldValue,
                            createdAt: now,
                            updatedAt: now,
                        },
                        {
                            auditing: {
                                ...auditing,
                                auditingRunner: this.auditingRunner,
                            },
                        },
                    );
                break;
        }

        await this.commandBus.dispatch(new AuditingUpdateSideEffectByIdCommand(
            {
                id        : payload.id,
                isRollback: true,
                rollbackSideEffectId,
            },
            constraint,
            {
                timezone,
            },
        ));

        return true;
    }
}