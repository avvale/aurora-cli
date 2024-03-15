/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappPaginateMessagesHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateMessagesHandler', () =>
{
    let handler: WhatsappPaginateMessagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappPaginateMessagesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<WhatsappPaginateMessagesHandler>(WhatsappPaginateMessagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('WhatsappPaginateMessagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappPaginateMessagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a messages', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: whatsappMockMessageData.length,
                count: whatsappMockMessageData.length,
                rows : whatsappMockMessageData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: whatsappMockMessageData.length,
                    count: whatsappMockMessageData.length,
                    rows : whatsappMockMessageData,
                });
        });
    });
});
