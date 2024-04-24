import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { WhatsappSeeder } from './whatsapp.seeder';
import { WhatsappWebhookApiControllers, WhatsappWebhookApiHandlers } from './webhook';
import { WhatsappModels, WhatsappHandlers, WhatsappServices, WhatsappRepositories, WhatsappSagas } from '@app/whatsapp';
import { WhatsappConversationApiControllers, WhatsappConversationApiResolvers, WhatsappConversationApiHandlers, WhatsappConversationApiServices } from './conversation';
import { WhatsappMessageApiControllers, WhatsappMessageApiResolvers, WhatsappMessageApiHandlers, WhatsappMessageApiServices } from './message';
import { WhatsappSharedModule } from './shared';
import { WhatsappTimelineApiControllers, WhatsappTimelineApiResolvers, WhatsappTimelineApiHandlers, WhatsappTimelineApiServices } from './timeline';

@Module({
    imports: [
        SharedModule,
        WhatsappSharedModule,
        SequelizeModule.forFeature([
                ...WhatsappModels
            ])
    ],
    controllers: [
        ...WhatsappWebhookApiControllers,
        ...WhatsappConversationApiControllers,
        ...WhatsappMessageApiControllers,
        ...WhatsappTimelineApiControllers
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
        ...WhatsappTimelineApiServices
    ],
})
export class WhatsappModule {}
