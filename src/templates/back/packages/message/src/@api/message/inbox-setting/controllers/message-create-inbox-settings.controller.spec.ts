import { MessageCreateInboxSettingsController, MessageCreateInboxSettingsHandler } from '@api/message/inbox-setting';
import { messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxSettingsController', () =>
{
    let controller: MessageCreateInboxSettingsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                MessageCreateInboxSettingsController,
            ],
            providers: [
                {
                    provide : MessageCreateInboxSettingsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageCreateInboxSettingsController>(MessageCreateInboxSettingsController);
    });

    describe('main', () =>
    {
        test('MessageCreateInboxSettingsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an messageMockInboxSettingData created', async () =>
        {
            expect(
                await controller.main(
                    messageMockInboxSettingData,
                ),
            )
                .toBe(undefined);
        });
    });
});
