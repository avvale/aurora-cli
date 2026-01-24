import { AuditingFindHttpCommunicationByIdHandler } from '@api/auditing/http-communication';
import { AuditingHttpCommunication } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.httpCommunication.get')
export class AuditingFindHttpCommunicationByIdResolver {
  constructor(
    private readonly handler: AuditingFindHttpCommunicationByIdHandler,
  ) {}

  @Query('auditingFindHttpCommunicationById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<AuditingHttpCommunication> {
    return await this.handler.main(id, constraint, timezone);
  }
}
