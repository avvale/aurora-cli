import {
  MessageUpdateOutboxByIdController,
  MessageUpdateOutboxByIdHandler,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateOutboxByIdController', () => {
  let controller: MessageUpdateOutboxByIdController;
  let handler: MessageUpdateOutboxByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageUpdateOutboxByIdController],
      providers: [
        {
          provide: MessageUpdateOutboxByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageUpdateOutboxByIdController>(
      MessageUpdateOutboxByIdController,
    );
    handler = module.get<MessageUpdateOutboxByIdHandler>(
      MessageUpdateOutboxByIdHandler,
    );
  });

  describe('main', () => {
    test('MessageUpdateOutboxByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a outbox updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockOutboxData[0])),
        );
      expect(await controller.main(messageMockOutboxData[0])).toBe(
        messageMockOutboxData[0],
      );
    });
  });
});
