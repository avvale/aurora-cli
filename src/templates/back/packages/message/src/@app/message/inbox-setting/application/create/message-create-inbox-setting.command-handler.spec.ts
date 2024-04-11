import { MessageCreateInboxSettingCommandHandler } from './message-create-inbox-setting.command-handler';
import { MessageCreateInboxSettingService } from './message-create-inbox-setting.service';
import { MessageCreateInboxSettingCommand, messageMockInboxSettingData } from '@app/message/inbox-setting';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxSettingCommandHandler', () =>
{
    let commandHandler: MessageCreateInboxSettingCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateInboxSettingCommandHandler,
                {
                    provide : MessageCreateInboxSettingService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageCreateInboxSettingCommandHandler>(MessageCreateInboxSettingCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateInboxSettingCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the MessageCreateInboxSettingService', async () =>
        {
            expect(await commandHandler.execute(
                new MessageCreateInboxSettingCommand(
                    {
                        id: messageMockInboxSettingData[0].id,
                        accountId: messageMockInboxSettingData[0].accountId,
                        sort: messageMockInboxSettingData[0].sort,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
