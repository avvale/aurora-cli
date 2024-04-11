/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateMessageByIdInput } from '@api/graphql';
import { MessageUpsertMessageHandler, MessageUpsertMessageResolver } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertMessageResolver', () =>
{
    let resolver: MessageUpsertMessageResolver;
    let handler: MessageUpsertMessageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpsertMessageResolver,
                {
                    provide : MessageUpsertMessageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageUpsertMessageResolver>(MessageUpsertMessageResolver);
        handler = module.get<MessageUpsertMessageHandler>(MessageUpsertMessageHandler);
    });

    test('MessageUpsertMessageResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpsertMessageResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an message upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData[0])));
            expect(await resolver.main(<MessageUpdateMessageByIdInput>messageMockMessageData[0])).toBe(messageMockMessageData[0]);
        });
    });
});
