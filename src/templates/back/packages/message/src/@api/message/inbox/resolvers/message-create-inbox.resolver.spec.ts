/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCreateInboxInput } from '@api/graphql';
import { MessageCreateInboxHandler, MessageCreateInboxResolver } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxResolver', () =>
{
    let resolver: MessageCreateInboxResolver;
    let handler: MessageCreateInboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageCreateInboxResolver,
                {
                    provide : MessageCreateInboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageCreateInboxResolver>(MessageCreateInboxResolver);
        handler = module.get<MessageCreateInboxHandler>(MessageCreateInboxHandler);
    });

    test('MessageCreateInboxResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageCreateInboxResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an inbox created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(await resolver.main(<MessageCreateInboxInput>messageMockInboxData[0])).toBe(messageMockInboxData[0]);
        });
    });
});
