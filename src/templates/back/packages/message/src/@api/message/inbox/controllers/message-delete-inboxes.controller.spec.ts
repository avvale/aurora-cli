import {
  MessageDeleteInboxesController,
  MessageDeleteInboxesHandler,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxesController', () => {
  let controller: MessageDeleteInboxesController;
  let handler: MessageDeleteInboxesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageDeleteInboxesController],
      providers: [
        {
          provide: MessageDeleteInboxesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageDeleteInboxesController>(
      MessageDeleteInboxesController,
    );
    handler = module.get<MessageDeleteInboxesHandler>(
      MessageDeleteInboxesHandler,
    );
  });

  describe('main', () => {
    test('MessageDeleteInboxesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an messageMockInboxData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxData)),
        );
      expect(await controller.main()).toBe(messageMockInboxData);
    });
  });
});
