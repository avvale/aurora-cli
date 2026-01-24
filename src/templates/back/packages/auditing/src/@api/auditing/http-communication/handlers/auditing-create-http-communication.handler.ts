import {
  AuditingCreateHttpCommunicationDto,
  AuditingHttpCommunicationDto,
} from '@api/auditing/http-communication';
import {
  AuditingCreateHttpCommunicationInput,
  AuditingHttpCommunication,
} from '@api/graphql';
import {
  AuditingCreateHttpCommunicationCommand,
  AuditingFindHttpCommunicationByIdQuery,
} from '@app/auditing/http-communication';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingCreateHttpCommunicationHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload:
      | AuditingCreateHttpCommunicationInput
      | AuditingCreateHttpCommunicationDto,
    timezone?: string,
  ): Promise<AuditingHttpCommunication | AuditingHttpCommunicationDto> {
    await this.commandBus.dispatch(
      new AuditingCreateHttpCommunicationCommand(payload, {
        timezone,
      }),
    );

    return await this.queryBus.ask(
      new AuditingFindHttpCommunicationByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
