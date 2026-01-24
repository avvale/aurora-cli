import { AuditingCreateHttpCommunicationsHandler } from '@api/auditing/http-communication';
import { AuditingCreateHttpCommunicationInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.httpCommunication.create')
export class AuditingCreateHttpCommunicationsResolver {
  constructor(
    private readonly handler: AuditingCreateHttpCommunicationsHandler,
  ) {}

  @Mutation('auditingCreateHttpCommunications')
  async main(
    @Args('payload') payload: AuditingCreateHttpCommunicationInput[],
    @Timezone() timezone?: string,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone);
  }
}
