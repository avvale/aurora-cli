import {
    MessageCreateInboxSettingsCommand,
    messageMockInboxSettingData,
} from '@app/message/inbox-setting';
import { MessageCreateInboxSettingsCommandHandler } from '@app/message/inbox-setting/application/create/message-create-inbox-settings.command-handler';
import { MessageCreateInboxSettingsService } from '@app/message/inbox-setting/application/create/message-create-inbox-settings.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('messageCreateInboxSettingsCommandHandler', () => {
    let commandHandler: MessageCreateInboxSettingsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateInboxSettingsCommandHandler,
                {
                    provide: MessageCreateInboxSettingsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<MessageCreateInboxSettingsCommandHandler>(
            MessageCreateInboxSettingsCommandHandler,
        );
    });

    describe('main', () => {
        test('MessageCreateInboxSettingsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return MessageMockInboxSettingData created', async () => {
            expect(
                await commandHandler.execute(
                    new MessageCreateInboxSettingsCommand(
                        messageMockInboxSettingData,
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
