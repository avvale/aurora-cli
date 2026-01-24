import {
  whatsappMockTimelineData,
  WhatsappUpdateAndIncrementTimelinesCommand,
} from '@app/whatsapp/timeline';
import { WhatsappUpdateAndIncrementTimelinesCommandHandler } from '@app/whatsapp/timeline/application/update/whatsapp-update-and-increment-timelines.command-handler';
import { WhatsappUpdateAndIncrementTimelinesService } from '@app/whatsapp/timeline/application/update/whatsapp-update-and-increment-timelines.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateAndIncrementTimelinesCommandHandler', () => {
  let commandHandler: WhatsappUpdateAndIncrementTimelinesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappUpdateAndIncrementTimelinesCommandHandler,
        {
          provide: WhatsappUpdateAndIncrementTimelinesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<WhatsappUpdateAndIncrementTimelinesCommandHandler>(
        WhatsappUpdateAndIncrementTimelinesCommandHandler,
      );
  });

  describe('main', () => {
    test('UpdateAndIncrementTimelinesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an timelines updated', async () => {
      /* eslint-disable key-spacing */
      expect(
        await commandHandler.execute(
          new WhatsappUpdateAndIncrementTimelinesCommand(
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
      /* eslint-enable key-spacing */
    });
  });
});
