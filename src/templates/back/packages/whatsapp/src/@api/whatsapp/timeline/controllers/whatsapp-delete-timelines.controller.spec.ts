import {
  WhatsappDeleteTimelinesController,
  WhatsappDeleteTimelinesHandler,
} from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteTimelinesController', () => {
  let controller: WhatsappDeleteTimelinesController;
  let handler: WhatsappDeleteTimelinesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappDeleteTimelinesController],
      providers: [
        {
          provide: WhatsappDeleteTimelinesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappDeleteTimelinesController>(
      WhatsappDeleteTimelinesController,
    );
    handler = module.get<WhatsappDeleteTimelinesHandler>(
      WhatsappDeleteTimelinesHandler,
    );
  });

  describe('main', () => {
    test('WhatsappDeleteTimelinesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an whatsappMockTimelineData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockTimelineData)),
        );
      expect(await controller.main()).toBe(whatsappMockTimelineData);
    });
  });
});
