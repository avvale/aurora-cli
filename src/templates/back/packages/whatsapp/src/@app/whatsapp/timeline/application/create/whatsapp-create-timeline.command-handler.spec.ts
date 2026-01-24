import {
  WhatsappCreateTimelineCommand,
  whatsappMockTimelineData,
} from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappCreateTimelineCommandHandler } from './whatsapp-create-timeline.command-handler';
import { WhatsappCreateTimelineService } from './whatsapp-create-timeline.service';

describe('WhatsappCreateTimelineCommandHandler', () => {
  let commandHandler: WhatsappCreateTimelineCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappCreateTimelineCommandHandler,
        {
          provide: WhatsappCreateTimelineService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<WhatsappCreateTimelineCommandHandler>(
      WhatsappCreateTimelineCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateTimelineCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the WhatsappCreateTimelineService', async () => {
      expect(
        await commandHandler.execute(
          new WhatsappCreateTimelineCommand(
            {
              id: whatsappMockTimelineData[0].id,
              accounts: whatsappMockTimelineData[0].accounts,
              wabaPhoneNumberId: whatsappMockTimelineData[0].wabaPhoneNumberId,
              wabaContactId: whatsappMockTimelineData[0].wabaContactId,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
