/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappDeleteMessagesHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteMessagesHandler', () =>
{
    let handler: WhatsappDeleteMessagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappDeleteMessagesHandler,
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

        handler = module.get<WhatsappDeleteMessagesHandler>(WhatsappDeleteMessagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('WhatsappDeleteMessagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappDeleteMessagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an whatsappMockMessageData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(whatsappMockMessageData);
        });
    });
});
