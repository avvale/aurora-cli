import { MessageDeleteMessageByIdCommand, messageMockMessageData } from '@app/message/message';
import { MessageDeleteMessageByIdCommandHandler } from '@app/message/message/application/delete/message-delete-message-by-id.command-handler';
import { MessageDeleteMessageByIdService } from '@app/message/message/application/delete/message-delete-message-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteMessageByIdCommandHandler', () =>
{
    let commandHandler: MessageDeleteMessageByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageDeleteMessageByIdCommandHandler,
                {
                    provide : MessageDeleteMessageByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageDeleteMessageByIdCommandHandler>(MessageDeleteMessageByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('MessageDeleteMessageByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the MessageDeleteMessageByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new MessageDeleteMessageByIdCommand(
                    messageMockMessageData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
