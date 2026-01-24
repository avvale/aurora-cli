import {
  MessageUpdateInboxByIdController,
  MessageUpdateInboxByIdHandler,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxByIdController', () => {
  let controller: MessageUpdateInboxByIdController;
  let handler: MessageUpdateInboxByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageUpdateInboxByIdController],
      providers: [
        {
          provide: MessageUpdateInboxByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageUpdateInboxByIdController>(
      MessageUpdateInboxByIdController,
    );
    handler = module.get<MessageUpdateInboxByIdHandler>(
      MessageUpdateInboxByIdHandler,
    );
  });

  describe('main', () => {
    test('MessageUpdateInboxByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a inbox updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxData[0])),
        );
      expect(await controller.main(messageMockInboxData[0])).toBe(
        messageMockInboxData[0],
      );
    });
  });
});
