import { MessageDeleteMessagesCommand } from '@app/message/message';
import { MessageDeleteMessagesCommandHandler } from '@app/message/message/application/delete/message-delete-messages.command-handler';
import { MessageDeleteMessagesService } from '@app/message/message/application/delete/message-delete-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteMessagesCommandHandler', () => {
    let commandHandler: MessageDeleteMessagesCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageDeleteMessagesCommandHandler,
                {
                    provide: MessageDeleteMessagesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<MessageDeleteMessagesCommandHandler>(
            MessageDeleteMessagesCommandHandler,
        );
    });

    describe('main', () => {
        test('MessageDeleteMessagesCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(
                    new MessageDeleteMessagesCommand(),
                ),
            ).toBe(undefined);
        });
    });
});
