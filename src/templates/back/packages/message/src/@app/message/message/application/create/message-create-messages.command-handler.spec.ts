import { MessageCreateMessagesCommand, messageMockMessageData } from '@app/message/message';
import { MessageCreateMessagesCommandHandler } from '@app/message/message/application/create/message-create-messages.command-handler';
import { MessageCreateMessagesService } from '@app/message/message/application/create/message-create-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('messageCreateMessagesCommandHandler', () =>
{
    let commandHandler: MessageCreateMessagesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateMessagesCommandHandler,
                {
                    provide : MessageCreateMessagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageCreateMessagesCommandHandler>(MessageCreateMessagesCommandHandler);
    });

    describe('main', () =>
    {
        test('MessageCreateMessagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return MessageMockMessageData created', async () =>
        {
            expect(await commandHandler.execute(
                new MessageCreateMessagesCommand(
                    messageMockMessageData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
