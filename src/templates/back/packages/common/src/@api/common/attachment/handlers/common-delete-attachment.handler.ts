import { CommonAttachmentsService } from '@api/common/shared';
import { CommonAttachment, CommonAttachmentInput } from '@api/graphql';
import {
  CommonDeleteAttachmentByIdCommand,
  CommonFindAttachmentByIdQuery,
} from '@app/common/attachment';
import { CommonDeleteAttachmentLibraryByIdCommand } from '@app/common/attachment-library';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { CommonAttachmentDto } from '../dto';

@Injectable()
export class CommonDeleteAttachmentHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    private readonly commonAttachmentsService: CommonAttachmentsService,
  ) {}

  async main(
    payload: CommonAttachmentInput | CommonAttachmentDto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAttachment | CommonAttachmentDto> {
    if (payload.isUploaded) {
      // delete attachment file, attachment library file and attachment sizes if exists
      this.commonAttachmentsService.deleteAttachmentFile(payload);
      return payload;
    }

    const attachment = await this.queryBus.ask(
      new CommonFindAttachmentByIdQuery(
        payload.id,
        _.merge(
          {},
          {
            include: [{ association: 'library' }],
          },
        ),
        {
          timezone,
        },
      ),
    );

    // delete attachment file, attachment library file and attachment sizes if exists
    this.commonAttachmentsService.deleteAttachmentFile(attachment);

    await this.commandBus.dispatch(
      new CommonDeleteAttachmentByIdCommand(
        payload.id,
        {},
        {
          timezone,
          repositoryOptions: {
            auditing,
          },
        },
      ),
    );

    // can to haven't a library isn't a image
    if (attachment.library) {
      await this.commandBus.dispatch(
        new CommonDeleteAttachmentLibraryByIdCommand(
          attachment.library.id,
          {},
          {
            timezone,
            repositoryOptions: {
              auditing,
            },
          },
        ),
      );
    }

    return attachment;
  }
}
