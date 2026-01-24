import { CommonAttachmentFamilyDto } from '@api/common/attachment-family';
import { CommonAttachmentFamily } from '@api/graphql';
import { CommonFindAttachmentFamilyByIdQuery } from '@app/common/attachment-family';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAttachmentFamilyByIdHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<CommonAttachmentFamily | CommonAttachmentFamilyDto> {
    return await this.queryBus.ask(
      new CommonFindAttachmentFamilyByIdQuery(id, constraint, {
        timezone,
      }),
    );
  }
}
