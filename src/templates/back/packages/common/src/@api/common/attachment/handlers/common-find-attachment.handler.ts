import { CommonAttachmentDto } from '@api/common/attachment';
import { CommonAttachment } from '@api/graphql';
import { CommonFindAttachmentQuery } from '@app/common/attachment';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAttachmentHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonAttachment | CommonAttachmentDto> {
    return await this.queryBus.ask(
      new CommonFindAttachmentQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
