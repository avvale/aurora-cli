import {
  WhatsappHandlers,
  WhatsappModels,
  WhatsappRepositories,
  WhatsappSagas,
  WhatsappServices,
} from '@app/whatsapp';
import { SharedModule } from '@aurora/shared.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  WhatsappConversationApiControllers,
  WhatsappConversationApiHandlers,
  WhatsappConversationApiResolvers,
  WhatsappConversationApiServices,
} from './conversation';
import {
  WhatsappMessageApiControllers,
  WhatsappMessageApiHandlers,
  WhatsappMessageApiResolvers,
  WhatsappMessageApiServices,
} from './message';
import { WhatsappSharedModule } from './shared';
import {
  WhatsappTimelineApiControllers,
  WhatsappTimelineApiHandlers,
  WhatsappTimelineApiResolvers,
  WhatsappTimelineApiServices,
} from './timeline';
import {
  WhatsappWebhookApiControllers,
  WhatsappWebhookApiHandlers,
} from './webhook';
import { WhatsappSeeder } from './whatsapp.seeder';

@Module({
  imports: [
    SharedModule,
    WhatsappSharedModule,
    SequelizeModule.forFeature([...WhatsappModels]),
  ],
  controllers: [
    ...WhatsappWebhookApiControllers,
    ...WhatsappConversationApiControllers,
    ...WhatsappMessageApiControllers,
    ...WhatsappTimelineApiControllers,
  ],
  providers: [
    WhatsappSeeder,
    ...WhatsappWebhookApiHandlers,
    ...WhatsappHandlers,
    ...WhatsappServices,
    ...WhatsappRepositories,
    ...WhatsappSagas,
    ...WhatsappConversationApiResolvers,
    ...WhatsappConversationApiHandlers,
    ...WhatsappConversationApiServices,
    ...WhatsappMessageApiResolvers,
    ...WhatsappMessageApiHandlers,
    ...WhatsappMessageApiServices,
    ...WhatsappTimelineApiResolvers,
    ...WhatsappTimelineApiHandlers,
    ...WhatsappTimelineApiServices,
  ],
})
export class WhatsappModule {}
