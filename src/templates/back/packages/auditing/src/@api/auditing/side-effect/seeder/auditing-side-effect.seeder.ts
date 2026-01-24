import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  AuditingCreateSideEffectsCommand,
  auditingMockSideEffectData,
} from '@app/auditing/side-effect';

@Injectable()
export class AuditingSideEffectSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new AuditingCreateSideEffectsCommand(auditingMockSideEffectData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
