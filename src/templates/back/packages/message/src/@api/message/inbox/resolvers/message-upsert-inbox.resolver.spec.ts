/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateInboxByIdInput } from '@api/graphql';
import { MessageUpsertInboxHandler, MessageUpsertInboxResolver } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertInboxResolver', () =>
{
    let resolver: MessageUpsertInboxResolver;
    let handler: MessageUpsertInboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpsertInboxResolver,
                {
                    provide : MessageUpsertInboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageUpsertInboxResolver>(MessageUpsertInboxResolver);
        handler = module.get<MessageUpsertInboxHandler>(MessageUpsertInboxHandler);
    });

    test('MessageUpsertInboxResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpsertInboxResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an inbox upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(await resolver.main(<MessageUpdateInboxByIdInput>messageMockInboxData[0])).toBe(messageMockInboxData[0]);
        });
    });
});
