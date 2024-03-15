/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappPaginateConversationsHandler, WhatsappPaginateConversationsResolver } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateConversationsResolver', () =>
{
    let resolver: WhatsappPaginateConversationsResolver;
    let handler: WhatsappPaginateConversationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappPaginateConversationsResolver,
                {
                    provide : WhatsappPaginateConversationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappPaginateConversationsResolver>(WhatsappPaginateConversationsResolver);
        handler = module.get<WhatsappPaginateConversationsHandler>(WhatsappPaginateConversationsHandler);
    });

    test('WhatsappPaginateConversationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappPaginateConversationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a whatsappMockConversationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : whatsappMockConversationData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : whatsappMockConversationData,
            });
        });
    });
});
