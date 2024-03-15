/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappPaginateMessagesHandler, WhatsappPaginateMessagesResolver } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateMessagesResolver', () =>
{
    let resolver: WhatsappPaginateMessagesResolver;
    let handler: WhatsappPaginateMessagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappPaginateMessagesResolver,
                {
                    provide : WhatsappPaginateMessagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappPaginateMessagesResolver>(WhatsappPaginateMessagesResolver);
        handler = module.get<WhatsappPaginateMessagesHandler>(WhatsappPaginateMessagesHandler);
    });

    test('WhatsappPaginateMessagesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappPaginateMessagesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a whatsappMockMessageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : whatsappMockMessageData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : whatsappMockMessageData,
            });
        });
    });
});
