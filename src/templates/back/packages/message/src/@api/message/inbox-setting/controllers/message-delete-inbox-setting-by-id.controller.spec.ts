/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageDeleteInboxSettingByIdController,
  MessageDeleteInboxSettingByIdHandler,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxSettingByIdController', () => {
  let controller: MessageDeleteInboxSettingByIdController;
  let handler: MessageDeleteInboxSettingByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageDeleteInboxSettingByIdController],
      providers: [
        {
          provide: MessageDeleteInboxSettingByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageDeleteInboxSettingByIdController>(
      MessageDeleteInboxSettingByIdController,
    );
    handler = module.get<MessageDeleteInboxSettingByIdHandler>(
      MessageDeleteInboxSettingByIdHandler,
    );
  });

  describe('main', () => {
    test('MessageDeleteInboxSettingByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an inboxSetting deleted', async () => {
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
