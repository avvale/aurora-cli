import { CommonAttachmentFamilyDto } from '@api/common/attachment-family';
import { CommonAttachmentFamily } from '@api/graphql';
import { CommonFindAttachmentFamilyQuery } from '@app/common/attachment-family';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAttachmentFamilyHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonAttachmentFamily | CommonAttachmentFamilyDto> {
    return await this.queryBus.ask(
      new CommonFindAttachmentFamilyQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
