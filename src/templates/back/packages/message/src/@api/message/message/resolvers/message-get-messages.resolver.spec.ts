/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageGetMessagesHandler, MessageGetMessagesResolver } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetMessagesResolver', () =>
{
    let resolver: MessageGetMessagesResolver;
    let handler: MessageGetMessagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageGetMessagesResolver,
                {
                    provide : MessageGetMessagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageGetMessagesResolver>(MessageGetMessagesResolver);
        handler = module.get<MessageGetMessagesHandler>(MessageGetMessagesHandler);
    });

    test('MessageGetMessagesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageGetMessagesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a messageMockMessageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData)));
            expect(await resolver.main()).toBe(messageMockMessageData);
        });
    });
});
