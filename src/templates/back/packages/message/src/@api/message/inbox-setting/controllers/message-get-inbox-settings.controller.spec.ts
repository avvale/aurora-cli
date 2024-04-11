import { MessageGetInboxSettingsController, MessageGetInboxSettingsHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetInboxSettingsController', () =>
{
    let controller: MessageGetInboxSettingsController;
    let handler: MessageGetInboxSettingsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageGetInboxSettingsController,
            ],
            providers: [
                {
                    provide : MessageGetInboxSettingsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageGetInboxSettingsController>(MessageGetInboxSettingsController);
        handler = module.get<MessageGetInboxSettingsHandler>(MessageGetInboxSettingsHandler);
    });

    describe('main', () =>
    {
        test('MessageGetInboxSettingsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a messageMockInboxSettingData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxSettingData)));
            expect(await controller.main()).toBe(messageMockInboxSettingData);
        });
    });
});
