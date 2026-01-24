import {
  WhatsappConversation,
  WhatsappConversationMapper,
  WhatsappConversationModel,
  WhatsappIConversationRepository,
} from '@app/whatsapp/conversation';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class WhatsappSequelizeConversationRepository
  extends SequelizeRepository<WhatsappConversation, WhatsappConversationModel>
  implements WhatsappIConversationRepository
{
  public readonly aggregateName: string = 'WhatsappConversation';
  public readonly mapper: WhatsappConversationMapper =
    new WhatsappConversationMapper();

  constructor(
    @InjectModel(WhatsappConversationModel)
    public readonly repository: typeof WhatsappConversationModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
