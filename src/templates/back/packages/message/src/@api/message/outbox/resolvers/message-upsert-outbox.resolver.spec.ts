/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateOutboxByIdInput } from '@api/graphql';
import { MessageUpsertOutboxHandler, MessageUpsertOutboxResolver } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertOutboxResolver', () =>
{
    let resolver: MessageUpsertOutboxResolver;
    let handler: MessageUpsertOutboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpsertOutboxResolver,
                {
                    provide : MessageUpsertOutboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageUpsertOutboxResolver>(MessageUpsertOutboxResolver);
        handler = module.get<MessageUpsertOutboxHandler>(MessageUpsertOutboxHandler);
    });

    test('MessageUpsertOutboxResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpsertOutboxResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an outbox upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData[0])));
            expect(await resolver.main(<MessageUpdateOutboxByIdInput>messageMockOutboxData[0])).toBe(messageMockOutboxData[0]);
        });
    });
});
