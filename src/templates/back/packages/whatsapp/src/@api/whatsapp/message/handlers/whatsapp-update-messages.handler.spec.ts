/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateMessagesInput } from '@api/graphql';
import { WhatsappUpdateMessagesHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateMessagesHandler', () =>
{
    let handler: WhatsappUpdateMessagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappUpdateMessagesHandler,
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

        handler = module.get<WhatsappUpdateMessagesHandler>(WhatsappUpdateMessagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('WhatsappUpdateMessagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappUpdateMessagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a messages updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(
                await handler.main(
                    <WhatsappUpdateMessagesInput>whatsappMockMessageData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(whatsappMockMessageData[0]);
        });
    });
});
