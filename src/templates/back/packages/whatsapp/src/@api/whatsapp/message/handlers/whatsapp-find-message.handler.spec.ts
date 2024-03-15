/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappFindMessageHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindMessageHandler', () =>
{
    let handler: WhatsappFindMessageHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappFindMessageHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<WhatsappFindMessageHandler>(WhatsappFindMessageHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('WhatsappFindMessageHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappFindMessageHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a message', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(whatsappMockMessageData[0]);
        });
    });
});
