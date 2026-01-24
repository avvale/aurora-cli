import {
  MessageCreateOutboxesController,
  MessageCreateOutboxesHandler,
} from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateOutboxesController', () => {
  let controller: MessageCreateOutboxesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageCreateOutboxesController],
      providers: [
        {
          provide: MessageCreateOutboxesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageCreateOutboxesController>(
      MessageCreateOutboxesController,
    );
  });

  describe('main', () => {
    test('MessageCreateOutboxesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an messageMockOutboxData created', async () => {
      expect(await controller.main(messageMockOutboxData)).toBe(undefined);
    });
  });
});
