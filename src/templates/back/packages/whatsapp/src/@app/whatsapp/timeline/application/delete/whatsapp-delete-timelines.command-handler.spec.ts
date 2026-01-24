import { WhatsappDeleteTimelinesCommand } from '@app/whatsapp/timeline';
import { WhatsappDeleteTimelinesCommandHandler } from '@app/whatsapp/timeline/application/delete/whatsapp-delete-timelines.command-handler';
import { WhatsappDeleteTimelinesService } from '@app/whatsapp/timeline/application/delete/whatsapp-delete-timelines.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteTimelinesCommandHandler', () => {
  let commandHandler: WhatsappDeleteTimelinesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappDeleteTimelinesCommandHandler,
        {
          provide: WhatsappDeleteTimelinesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<WhatsappDeleteTimelinesCommandHandler>(
      WhatsappDeleteTimelinesCommandHandler,
    );
  });

  describe('main', () => {
    test('WhatsappDeleteTimelinesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(
        await commandHandler.execute(new WhatsappDeleteTimelinesCommand()),
      ).toBe(undefined);
    });
  });
});
