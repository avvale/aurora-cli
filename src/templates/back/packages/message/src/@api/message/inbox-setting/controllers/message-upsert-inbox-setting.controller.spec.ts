import { MessageUpsertInboxSettingController, MessageUpsertInboxSettingHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertInboxSettingController', () =>
{
    let controller: MessageUpsertInboxSettingController;
    let handler: MessageUpsertInboxSettingHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageUpsertInboxSettingController,
            ],
            providers: [
                {
                    provide : MessageUpsertInboxSettingHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageUpsertInboxSettingController>(MessageUpsertInboxSettingController);
        handler = module.get<MessageUpsertInboxSettingHandler>(MessageUpsertInboxSettingHandler);
    });

    describe('main', () =>
    {
        test('MessageUpsertInboxSettingController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an inboxSetting upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxSettingData[0])));
            expect(await controller.main(messageMockInboxSettingData[0])).toBe(messageMockInboxSettingData[0]);
        });
    });
});
