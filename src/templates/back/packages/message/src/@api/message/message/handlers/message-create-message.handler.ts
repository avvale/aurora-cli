import { MessageCreateMessageInput, MessageMessage } from '@api/graphql';
import {
  MessageCreateMessageDto,
  MessageMessageDto,
} from '@api/message/message';

import { createMessage } from '@api/message/shared';
import { IamAccountResponse } from '@app/iam/account';
import { MessageFindMessageByIdQuery } from '@app/message/message';
import { AuditingMeta, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class MessageCreateMessageHandler {
  constructor(
    private readonly queryBus: IQueryBus,
    private readonly moduleRef: ModuleRef,
  ) {}

  async main(
    account: IamAccountResponse,
    payload: MessageCreateMessageInput | MessageCreateMessageDto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<MessageMessage | MessageMessageDto> {
    // At a minimum, it must have the tenants of the account that is creating the message.
    // We only set tenantIds if they are not included in the payload and if there are no
    // account or tenant recipients in the payload.
    // If there are recipient accounts, the message-check-messages-inbox.handler.ts process
    // filters them and only if there are no tenants but there are recipient accounts, it is sent to those accounts.
    if (
      (!Array.isArray(payload.tenantRecipientIds) ||
        payload.tenantRecipientIds.length === 0) &&
      (!Array.isArray(payload.accountRecipientIds) ||
        payload.accountRecipientIds.length === 0)
    ) {
      payload.tenantRecipientIds = account.dTenants;
    }

    await createMessage({
      moduleRef: this.moduleRef,
      payload,
      timezone,
      auditing,
    });

    return await this.queryBus.ask(
      new MessageFindMessageByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
