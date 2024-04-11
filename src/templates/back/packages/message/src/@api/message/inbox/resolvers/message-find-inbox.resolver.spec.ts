/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindInboxHandler, MessageFindInboxResolver } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxResolver', () =>
{
    let resolver: MessageFindInboxResolver;
    let handler: MessageFindInboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageFindInboxResolver,
                {
                    provide : MessageFindInboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageFindInboxResolver>(MessageFindInboxResolver);
        handler = module.get<MessageFindInboxHandler>(MessageFindInboxHandler);
    });

    test('MessageFindInboxResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageFindInboxResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a inbox', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(await resolver.main()).toBe(messageMockInboxData[0]);
        });
    });
});
