import { messageMockInboxSettingData, MessageUpsertInboxSettingCommand } from '@app/message/inbox-setting';
import { MessageUpsertInboxSettingCommandHandler } from '@app/message/inbox-setting/application/upsert/message-upsert-inbox-setting.command-handler';
import { MessageUpsertInboxSettingService } from '@app/message/inbox-setting/application/upsert/message-upsert-inbox-setting.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertInboxSettingCommandHandler', () =>
{
    let commandHandler: MessageUpsertInboxSettingCommandHandler;
    let service: MessageUpsertInboxSettingService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageUpsertInboxSettingCommandHandler,
                {
                    provide : MessageUpsertInboxSettingService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageUpsertInboxSettingCommandHandler>(MessageUpsertInboxSettingCommandHandler);
        service = module.get<MessageUpsertInboxSettingService>(MessageUpsertInboxSettingService);
    });

    describe('main', () =>
    {
        test('UpsertInboxSettingCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the MessageUpsertInboxSettingService', async () =>
        {
            expect(await commandHandler.execute(
                new MessageUpsertInboxSettingCommand(
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
