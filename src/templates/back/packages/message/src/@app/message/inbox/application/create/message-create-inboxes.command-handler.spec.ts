import { MessageCreateInboxesCommand, messageMockInboxData } from '@app/message/inbox';
import { MessageCreateInboxesCommandHandler } from '@app/message/inbox/application/create/message-create-inboxes.command-handler';
import { MessageCreateInboxesService } from '@app/message/inbox/application/create/message-create-inboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('messageCreateInboxesCommandHandler', () =>
{
    let commandHandler: MessageCreateInboxesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateInboxesCommandHandler,
                {
                    provide : MessageCreateInboxesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageCreateInboxesCommandHandler>(MessageCreateInboxesCommandHandler);
    });

    describe('main', () =>
    {
        test('MessageCreateInboxesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return MessageMockInboxData created', async () =>
        {
            expect(await commandHandler.execute(
                new MessageCreateInboxesCommand(
                    messageMockInboxData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
