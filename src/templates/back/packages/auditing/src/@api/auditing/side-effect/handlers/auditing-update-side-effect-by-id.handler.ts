import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';

// @app
import { FindSideEffectByIdQuery } from '@app/auditing/side-effect/application/find/find-side-effect-by-id.query';
import { UpdateSideEffectByIdCommand } from '@app/auditing/side-effect/application/update/update-side-effect-by-id.command';
import { AuditingSideEffect, AuditingUpdateSideEffectByIdInput } from '@api/graphql';
import { AuditingSideEffectDto, AuditingUpdateSideEffectByIdDto } from '../dto';

@Injectable()
export class AuditingUpdateSideEffectByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AuditingUpdateSideEffectByIdInput | AuditingUpdateSideEffectByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingSideEffect | AuditingSideEffectDto>
    {
        const sideEffect = await this.queryBus.ask(new FindSideEffectByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));

        const dataToUpdate = Utils.diff(payload, sideEffect);

        await this.commandBus.dispatch(new UpdateSideEffectByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindSideEffectByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));
    }
}