import { MessageDeleteOutboxesCommand } from '@app/message/outbox';
import { MessageDeleteOutboxesCommandHandler } from '@app/message/outbox/application/delete/message-delete-outboxes.command-handler';
import { MessageDeleteOutboxesService } from '@app/message/outbox/application/delete/message-delete-outboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteOutboxesCommandHandler', () => {
    let commandHandler: MessageDeleteOutboxesCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageDeleteOutboxesCommandHandler,
                {
                    provide: MessageDeleteOutboxesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<MessageDeleteOutboxesCommandHandler>(
            MessageDeleteOutboxesCommandHandler,
        );
    });

    describe('main', () => {
        test('MessageDeleteOutboxesCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(
                    new MessageDeleteOutboxesCommand(),
                ),
            ).toBe(undefined);
        });
    });
});
