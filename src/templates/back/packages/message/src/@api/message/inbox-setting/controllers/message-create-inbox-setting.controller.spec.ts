import { MessageCreateInboxSettingController, MessageCreateInboxSettingHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxSettingController', () =>
{
    let controller: MessageCreateInboxSettingController;
    let handler: MessageCreateInboxSettingHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageCreateInboxSettingController,
            ],
            providers: [
                {
                    provide : MessageCreateInboxSettingHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageCreateInboxSettingController>(MessageCreateInboxSettingController);
        handler = module.get<MessageCreateInboxSettingHandler>(MessageCreateInboxSettingHandler);
    });

    describe('main', () =>
    {
        test('MessageCreateInboxSettingController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an inboxSetting created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxSettingData[0])));
            expect(
                await controller.main(
                    messageMockInboxSettingData[0],
                ),
            )
                .toBe(messageMockInboxSettingData[0]);
        });
    });
});
