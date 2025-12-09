import {
    messageMockInboxSettingData,
    MessageUpdateInboxSettingsCommand,
} from '@app/message/inbox-setting';
import { MessageUpdateInboxSettingsCommandHandler } from '@app/message/inbox-setting/application/update/message-update-inbox-settings.command-handler';
import { MessageUpdateInboxSettingsService } from '@app/message/inbox-setting/application/update/message-update-inbox-settings.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxSettingsCommandHandler', () => {
    let commandHandler: MessageUpdateInboxSettingsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageUpdateInboxSettingsCommandHandler,
                {
                    provide: MessageUpdateInboxSettingsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<MessageUpdateInboxSettingsCommandHandler>(
            MessageUpdateInboxSettingsCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateInboxSettingsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an inboxSettings updated', async () => {
            expect(
                await commandHandler.execute(
                    new MessageUpdateInboxSettingsCommand(
                        {
                            id: messageMockInboxSettingData[0].id,
                            rowId: messageMockInboxSettingData[0].rowId,
                            accountId: messageMockInboxSettingData[0].accountId,
                            lastReadMessageRowId:
                                messageMockInboxSettingData[0]
                                    .lastReadMessageRowId,
                        },
                        {},
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
