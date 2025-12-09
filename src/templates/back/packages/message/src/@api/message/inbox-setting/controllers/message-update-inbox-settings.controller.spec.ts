import {
    MessageUpdateInboxSettingsController,
    MessageUpdateInboxSettingsHandler,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxSettingsController', () => {
    let controller: MessageUpdateInboxSettingsController;
    let handler: MessageUpdateInboxSettingsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageUpdateInboxSettingsController],
            providers: [
                {
                    provide: MessageUpdateInboxSettingsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageUpdateInboxSettingsController>(
            MessageUpdateInboxSettingsController,
        );
        handler = module.get<MessageUpdateInboxSettingsHandler>(
            MessageUpdateInboxSettingsHandler,
        );
    });

    describe('main', () => {
        test('MessageUpdateInboxSettingsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a inboxSettings updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockInboxSettingData[0]),
                    ),
            );
            expect(await controller.main(messageMockInboxSettingData[0])).toBe(
                messageMockInboxSettingData[0],
            );
        });
    });
});
