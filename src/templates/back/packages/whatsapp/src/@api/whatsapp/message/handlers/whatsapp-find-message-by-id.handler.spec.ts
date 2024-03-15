/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappFindMessageByIdHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindMessageByIdHandler', () =>
{
    let handler: WhatsappFindMessageByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappFindMessageByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<WhatsappFindMessageByIdHandler>(WhatsappFindMessageByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('WhatsappFindMessageByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappFindMessageByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an message by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(
                await handler.main(
                    whatsappMockMessageData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(whatsappMockMessageData[0]);
        });
    });
});
