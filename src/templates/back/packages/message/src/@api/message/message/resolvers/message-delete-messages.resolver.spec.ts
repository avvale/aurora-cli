/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteMessagesHandler, MessageDeleteMessagesResolver } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteMessagesResolver', () =>
{
    let resolver: MessageDeleteMessagesResolver;
    let handler: MessageDeleteMessagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageDeleteMessagesResolver,
                {
                    provide : MessageDeleteMessagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageDeleteMessagesResolver>(MessageDeleteMessagesResolver);
        handler = module.get<MessageDeleteMessagesHandler>(MessageDeleteMessagesHandler);
    });

    test('MessageDeleteMessagesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageDeleteMessagesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messageMockMessageData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData)));
            expect(await resolver.main()).toBe(messageMockMessageData);
        });
    });
});
