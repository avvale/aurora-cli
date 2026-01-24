import {
  WhatsappFindTimelineByIdController,
  WhatsappFindTimelineByIdHandler,
} from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindTimelineByIdController', () => {
  let controller: WhatsappFindTimelineByIdController;
  let handler: WhatsappFindTimelineByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappFindTimelineByIdController],
      providers: [
        {
          provide: WhatsappFindTimelineByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappFindTimelineByIdController>(
      WhatsappFindTimelineByIdController,
    );
    handler = module.get<WhatsappFindTimelineByIdHandler>(
      WhatsappFindTimelineByIdHandler,
    );
  });

  describe('main', () => {
    test('WhatsappFindTimelineByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an timeline by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockTimelineData[0])),
        );
      expect(await controller.main(whatsappMockTimelineData[0].id)).toBe(
        whatsappMockTimelineData[0],
      );
    });
  });
});
