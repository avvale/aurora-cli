import {
    MessageFindInboxSettingController,
    MessageFindInboxSettingHandler,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxSettingController', () => {
    let controller: MessageFindInboxSettingController;
    let handler: MessageFindInboxSettingHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageFindInboxSettingController],
            providers: [
                {
                    provide: MessageFindInboxSettingHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageFindInboxSettingController>(
            MessageFindInboxSettingController,
        );
        handler = module.get<MessageFindInboxSettingHandler>(
            MessageFindInboxSettingHandler,
        );
    });

    describe('main', () => {
        test('MessageFindInboxSettingController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a inboxSetting', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockInboxSettingData[0]),
                    ),
            );
            expect(await controller.main()).toBe(
                messageMockInboxSettingData[0],
            );
        });
    });
});
