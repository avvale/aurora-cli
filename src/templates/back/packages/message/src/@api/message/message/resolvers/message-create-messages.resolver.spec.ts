import { MessageCreateMessageInput } from '@api/graphql';
import { MessageCreateMessagesHandler, MessageCreateMessagesResolver } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateMessagesResolver', () =>
{
    let resolver: MessageCreateMessagesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateMessagesResolver,
                {
                    provide : MessageCreateMessagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageCreateMessagesResolver>(MessageCreateMessagesResolver);
    });

    test('MessageCreateMessagesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageCreateMessagesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messages created', async () =>
        {
            expect(await resolver.main(<MessageCreateMessageInput[]>messageMockMessageData)).toBe(undefined);
        });
    });
});
