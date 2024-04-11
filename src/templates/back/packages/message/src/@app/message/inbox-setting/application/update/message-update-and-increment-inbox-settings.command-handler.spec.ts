import { messageMockInboxSettingData, MessageUpdateAndIncrementInboxSettingsCommand } from '@app/message/inbox-setting';
import { MessageUpdateAndIncrementInboxSettingsCommandHandler } from '@app/message/inbox-setting/application/update/message-update-and-increment-inbox-settings.command-handler';
import { MessageUpdateAndIncrementInboxSettingsService } from '@app/message/inbox-setting/application/update/message-update-and-increment-inbox-settings.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateAndIncrementInboxSettingsCommandHandler', () =>
{
    let commandHandler: MessageUpdateAndIncrementInboxSettingsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageUpdateAndIncrementInboxSettingsCommandHandler,
                {
                    provide : MessageUpdateAndIncrementInboxSettingsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageUpdateAndIncrementInboxSettingsCommandHandler>(MessageUpdateAndIncrementInboxSettingsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementInboxSettingsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an inboxSettings updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new MessageUpdateAndIncrementInboxSettingsCommand(
                    {
                        id: messageMockInboxSettingData[0].id,
                        accountId: messageMockInboxSettingData[0].accountId,
                        sort: messageMockInboxSettingData[0].sort,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
