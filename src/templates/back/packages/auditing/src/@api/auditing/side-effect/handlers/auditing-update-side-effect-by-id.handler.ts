import {
  AuditingSideEffectDto,
  AuditingUpdateSideEffectByIdDto,
} from '@api/auditing/side-effect';
import {
  AuditingSideEffect,
  AuditingUpdateSideEffectByIdInput,
} from '@api/graphql';
import {
  AuditingFindSideEffectByIdQuery,
  AuditingUpdateSideEffectByIdCommand,
} from '@app/auditing/side-effect';
import {
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingUpdateSideEffectByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload:
      | AuditingUpdateSideEffectByIdInput
      | AuditingUpdateSideEffectByIdDto,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<AuditingSideEffect | AuditingSideEffectDto> {
    const sideEffect = await this.queryBus.ask(
      new AuditingFindSideEffectByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    const dataToUpdate = diff(payload, sideEffect);

    await this.commandBus.dispatch(
      new AuditingUpdateSideEffectByIdCommand(
        {
          ...dataToUpdate,
          id: payload.id,
        },
        constraint,
        {
          timezone,
        },
      ),
    );

    return await this.queryBus.ask(
      new AuditingFindSideEffectByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}
