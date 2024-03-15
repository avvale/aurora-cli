import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { WhatsappSeeder } from './whatsapp.seeder';
import { WhatsappWebhookApiControllers, WhatsappWebhookApiHandlers } from './webhook';
import { WhatsappModels, WhatsappHandlers, WhatsappServices, WhatsappRepositories, WhatsappSagas } from '@app/whatsapp';
import { WhatsappConversationApiControllers, WhatsappConversationApiResolvers, WhatsappConversationApiHandlers, WhatsappConversationApiServices } from './conversation';
import { WhatsappMessageApiControllers, WhatsappMessageApiResolvers, WhatsappMessageApiHandlers, WhatsappMessageApiServices } from './message';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...WhatsappModels
            ])
    ],
    controllers: [
        ...WhatsappWebhookApiControllers,
        ...WhatsappConversationApiControllers,
        ...WhatsappMessageApiControllers
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
        ...WhatsappMessageApiServices
    ],
})
export class WhatsappModule {}
