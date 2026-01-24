import {
  MessageFindInboxSettingByIdController,
  MessageFindInboxSettingByIdHandler,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxSettingByIdController', () => {
  let controller: MessageFindInboxSettingByIdController;
  let handler: MessageFindInboxSettingByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageFindInboxSettingByIdController],
      providers: [
        {
          provide: MessageFindInboxSettingByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageFindInboxSettingByIdController>(
      MessageFindInboxSettingByIdController,
    );
    handler = module.get<MessageFindInboxSettingByIdHandler>(
      MessageFindInboxSettingByIdHandler,
    );
  });

  describe('main', () => {
    test('MessageFindInboxSettingByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an inboxSetting by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(messageMockInboxSettingData[0])),
        );
      expect(await controller.main(messageMockInboxSettingData[0].id)).toBe(
        messageMockInboxSettingData[0],
      );
    });
  });
});
