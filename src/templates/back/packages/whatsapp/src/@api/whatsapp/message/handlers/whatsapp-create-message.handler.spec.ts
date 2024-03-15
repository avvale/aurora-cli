/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappCreateMessageHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateMessageHandler', () =>
{
    let handler: WhatsappCreateMessageHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappCreateMessageHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<WhatsappCreateMessageHandler>(WhatsappCreateMessageHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('WhatsappCreateMessageHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an message created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(
                await handler.main(
                    whatsappMockMessageData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(whatsappMockMessageData[0]);
        });
    });
});
