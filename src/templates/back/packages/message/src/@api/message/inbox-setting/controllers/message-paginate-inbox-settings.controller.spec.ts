import { MessagePaginateInboxSettingsController, MessagePaginateInboxSettingsHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateInboxSettingsController', () =>
{
    let controller: MessagePaginateInboxSettingsController;
    let handler: MessagePaginateInboxSettingsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessagePaginateInboxSettingsController,
            ],
            providers: [
                {
                    provide : MessagePaginateInboxSettingsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessagePaginateInboxSettingsController>(MessagePaginateInboxSettingsController);
        handler = module.get<MessagePaginateInboxSettingsHandler>(MessagePaginateInboxSettingsHandler);
    });

    describe('main', () =>
    {
        test('MessagePaginateInboxSettingsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a messageMockInboxSettingData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : messageMockInboxSettingData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : messageMockInboxSettingData,
            });
        });
    });
});
