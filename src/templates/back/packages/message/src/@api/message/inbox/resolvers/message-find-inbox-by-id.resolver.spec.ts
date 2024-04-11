/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindInboxByIdHandler, MessageFindInboxByIdResolver } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxByIdResolver', () =>
{
    let resolver: MessageFindInboxByIdResolver;
    let handler: MessageFindInboxByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageFindInboxByIdResolver,
                {
                    provide : MessageFindInboxByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageFindInboxByIdResolver>(MessageFindInboxByIdResolver);
        handler = module.get<MessageFindInboxByIdHandler>(MessageFindInboxByIdHandler);
    });

    test('MessageFindInboxByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageFindInboxByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an inbox by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(await resolver.main(messageMockInboxData[0].id)).toBe(messageMockInboxData[0]);
        });
    });
});
