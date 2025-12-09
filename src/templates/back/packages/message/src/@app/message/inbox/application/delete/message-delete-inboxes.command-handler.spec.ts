import { MessageDeleteInboxesCommand } from '@app/message/inbox';
import { MessageDeleteInboxesCommandHandler } from '@app/message/inbox/application/delete/message-delete-inboxes.command-handler';
import { MessageDeleteInboxesService } from '@app/message/inbox/application/delete/message-delete-inboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxesCommandHandler', () => {
    let commandHandler: MessageDeleteInboxesCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageDeleteInboxesCommandHandler,
                {
                    provide: MessageDeleteInboxesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<MessageDeleteInboxesCommandHandler>(
            MessageDeleteInboxesCommandHandler,
        );
    });

    describe('main', () => {
        test('MessageDeleteInboxesCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(new MessageDeleteInboxesCommand()),
            ).toBe(undefined);
        });
    });
});
