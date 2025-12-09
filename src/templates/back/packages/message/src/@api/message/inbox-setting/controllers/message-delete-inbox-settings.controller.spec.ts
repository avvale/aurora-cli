import {
    MessageDeleteInboxSettingsController,
    MessageDeleteInboxSettingsHandler,
} from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxSettingsController', () => {
    let controller: MessageDeleteInboxSettingsController;
    let handler: MessageDeleteInboxSettingsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [MessageDeleteInboxSettingsController],
            providers: [
                {
                    provide: MessageDeleteInboxSettingsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<MessageDeleteInboxSettingsController>(
            MessageDeleteInboxSettingsController,
        );
        handler = module.get<MessageDeleteInboxSettingsHandler>(
            MessageDeleteInboxSettingsHandler,
        );
    });

    describe('main', () => {
        test('MessageDeleteInboxSettingsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an messageMockInboxSettingData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(messageMockInboxSettingData),
                    ),
            );
            expect(await controller.main()).toBe(messageMockInboxSettingData);
        });
    });
});
