/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageDeleteInboxByIdController,
  MessageDeleteInboxByIdHandler,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxByIdController', () => {
  let controller: MessageDeleteInboxByIdController;
  let handler: MessageDeleteInboxByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageDeleteInboxByIdController],
      providers: [
        {
          provide: MessageDeleteInboxByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageDeleteInboxByIdController>(
      MessageDeleteInboxByIdController,
    );
    handler = module.get<MessageDeleteInboxByIdHandler>(
      MessageDeleteInboxByIdHandler,
    );
  });

  describe('main', () => {
    test('MessageDeleteInboxByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an inbox deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxData[0])),
        );
      expect(await controller.main(messageMockInboxData[0].id)).toBe(
        messageMockInboxData[0],
      );
    });
  });
});
