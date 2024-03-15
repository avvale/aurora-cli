import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WhatsappConnectorService } from './services/whatsapp-connector.service';

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        WhatsappConnectorService,
    ],
    exports: [
        WhatsappConnectorService,
    ],
})
export class WhatsappSharedModule {}
