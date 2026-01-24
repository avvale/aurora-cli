import {
  WhatsappDeleteTimelineByIdCommand,
  whatsappMockTimelineData,
} from '@app/whatsapp/timeline';
import { WhatsappDeleteTimelineByIdCommandHandler } from '@app/whatsapp/timeline/application/delete/whatsapp-delete-timeline-by-id.command-handler';
import { WhatsappDeleteTimelineByIdService } from '@app/whatsapp/timeline/application/delete/whatsapp-delete-timeline-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteTimelineByIdCommandHandler', () => {
  let commandHandler: WhatsappDeleteTimelineByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappDeleteTimelineByIdCommandHandler,
        {
          provide: WhatsappDeleteTimelineByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<WhatsappDeleteTimelineByIdCommandHandler>(
      WhatsappDeleteTimelineByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('WhatsappDeleteTimelineByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the WhatsappDeleteTimelineByIdService', async () => {
      expect(
        await commandHandler.execute(
          new WhatsappDeleteTimelineByIdCommand(whatsappMockTimelineData[0].id),
        ),
      ).toBe(undefined);
    });
  });
});
