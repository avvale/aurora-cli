import { MessageCreateOutboxesCommand, messageMockOutboxData } from '@app/message/outbox';
import { MessageCreateOutboxesCommandHandler } from '@app/message/outbox/application/create/message-create-outboxes.command-handler';
import { MessageCreateOutboxesService } from '@app/message/outbox/application/create/message-create-outboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('messageCreateOutboxesCommandHandler', () =>
{
    let commandHandler: MessageCreateOutboxesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateOutboxesCommandHandler,
                {
                    provide : MessageCreateOutboxesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageCreateOutboxesCommandHandler>(MessageCreateOutboxesCommandHandler);
    });

    describe('main', () =>
    {
        test('MessageCreateOutboxesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return MessageMockOutboxData created', async () =>
        {
            expect(await commandHandler.execute(
                new MessageCreateOutboxesCommand(
                    messageMockOutboxData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
