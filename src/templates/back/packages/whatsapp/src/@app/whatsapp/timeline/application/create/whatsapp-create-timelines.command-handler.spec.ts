import {
  WhatsappCreateTimelinesCommand,
  whatsappMockTimelineData,
} from '@app/whatsapp/timeline';
import { WhatsappCreateTimelinesCommandHandler } from '@app/whatsapp/timeline/application/create/whatsapp-create-timelines.command-handler';
import { WhatsappCreateTimelinesService } from '@app/whatsapp/timeline/application/create/whatsapp-create-timelines.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('whatsappCreateTimelinesCommandHandler', () => {
  let commandHandler: WhatsappCreateTimelinesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappCreateTimelinesCommandHandler,
        {
          provide: WhatsappCreateTimelinesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<WhatsappCreateTimelinesCommandHandler>(
      WhatsappCreateTimelinesCommandHandler,
    );
  });

  describe('main', () => {
    test('WhatsappCreateTimelinesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return WhatsappMockTimelineData created', async () => {
      expect(
        await commandHandler.execute(
          new WhatsappCreateTimelinesCommand(whatsappMockTimelineData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
