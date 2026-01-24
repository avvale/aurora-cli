import { MessageUpdateMessageByIdInput } from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account';
import {
  MessageFindMessageByIdQuery,
  MessageUpdateMessageByIdCommand,
} from '@app/message/message';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
  storagePublicAbsolutePath,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'node:fs';
import { MessageUpdateMessageByIdDto } from '../dto';

@Injectable()
export class MessageRemoveAttachmentMessageHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    account: IamAccountResponse,
    message: MessageUpdateMessageByIdInput | MessageUpdateMessageByIdDto,
    attachmentId: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<boolean> {
    const currentMessage = await this.queryBus.ask(
      new MessageFindMessageByIdQuery(message.id, constraint, {
        timezone,
      }),
    );

    const attachment = currentMessage.attachments.find(
      (attachment) => attachment.id === attachmentId,
    );

    // delete icon file
    const absolutePath = storagePublicAbsolutePath(
      attachment.relativePathSegments,
      attachment.filename,
    );
    if (existsSync(absolutePath)) unlinkSync(absolutePath);

    await this.commandBus.dispatch(
      new MessageUpdateMessageByIdCommand(
        {
          id: currentMessage.id,
          attachments: currentMessage.attachments.filter(
            (attachment) => attachment.id !== attachmentId,
          ),
        },
        constraint,
        {
          timezone,
          repositoryOptions: {
            auditing,
          },
        },
      ),
    );

    return true;
  }
}
