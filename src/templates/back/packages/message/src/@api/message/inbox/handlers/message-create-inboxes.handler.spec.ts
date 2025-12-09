import { MessageCreateInboxesHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxesHandler', () => {
    let handler: MessageCreateInboxesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateInboxesHandler,
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<MessageCreateInboxesHandler>(
            MessageCreateInboxesHandler,
        );
    });

    describe('main', () => {
        test('MessageCreateInboxesHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an messageMockInboxData created', async () => {
            expect(await handler.main(messageMockInboxData)).toBe(true);
        });
    });
});
