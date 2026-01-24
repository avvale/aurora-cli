import { AuditingGetHttpCommunicationsHandler } from '@api/auditing/http-communication';
import { AuditingHttpCommunication } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.httpCommunication.get')
export class AuditingGetHttpCommunicationsResolver {
  constructor(private readonly handler: AuditingGetHttpCommunicationsHandler) {}

  @Query('auditingGetHttpCommunications')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<AuditingHttpCommunication[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
