/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappDeleteTimelineByIdController,
  WhatsappDeleteTimelineByIdHandler,
} from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteTimelineByIdController', () => {
  let controller: WhatsappDeleteTimelineByIdController;
  let handler: WhatsappDeleteTimelineByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappDeleteTimelineByIdController],
      providers: [
        {
          provide: WhatsappDeleteTimelineByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappDeleteTimelineByIdController>(
      WhatsappDeleteTimelineByIdController,
    );
    handler = module.get<WhatsappDeleteTimelineByIdHandler>(
      WhatsappDeleteTimelineByIdHandler,
    );
  });

  describe('main', () => {
    test('WhatsappDeleteTimelineByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an timeline deleted', async () => {
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
