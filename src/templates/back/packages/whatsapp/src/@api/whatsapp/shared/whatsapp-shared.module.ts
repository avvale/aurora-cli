import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WhatsappConnectorService } from './services/whatsapp-connector.service';
import { WhatsappTimelineService } from './services/whatsapp-timeline.service';

@Global()
@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        WhatsappConnectorService,
        WhatsappTimelineService,
    ],
    exports: [
        WhatsappConnectorService,
        WhatsappTimelineService,
    ],
})
export class WhatsappSharedModule {}
