import {
  whatsappMockTimelineData,
  WhatsappUpdateTimelinesCommand,
} from '@app/whatsapp/timeline';
import { WhatsappUpdateTimelinesCommandHandler } from '@app/whatsapp/timeline/application/update/whatsapp-update-timelines.command-handler';
import { WhatsappUpdateTimelinesService } from '@app/whatsapp/timeline/application/update/whatsapp-update-timelines.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateTimelinesCommandHandler', () => {
  let commandHandler: WhatsappUpdateTimelinesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappUpdateTimelinesCommandHandler,
        {
          provide: WhatsappUpdateTimelinesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<WhatsappUpdateTimelinesCommandHandler>(
      WhatsappUpdateTimelinesCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateTimelinesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an timelines updated', async () => {
      expect(
        await commandHandler.execute(
          new WhatsappUpdateTimelinesCommand(
            {
              id: whatsappMockTimelineData[0].id,
              accounts: whatsappMockTimelineData[0].accounts,
              wabaPhoneNumberId: whatsappMockTimelineData[0].wabaPhoneNumberId,
              wabaContactId: whatsappMockTimelineData[0].wabaContactId,
            },
            {},
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
