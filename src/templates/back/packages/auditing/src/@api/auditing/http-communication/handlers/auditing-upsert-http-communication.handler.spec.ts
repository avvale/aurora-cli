/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingUpsertHttpCommunicationHandler } from './auditing-upsert-http-communication.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingUpsertHttpCommunicationHandler', () =>
{
    let handler: AuditingUpsertHttpCommunicationHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingUpsertHttpCommunicationHandler,
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

        handler     = module.get<AuditingUpsertHttpCommunicationHandler>(AuditingUpsertHttpCommunicationHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AuditingUpsertHttpCommunicationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an httpCommunication upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await handler.main(httpCommunications[0])).toBe(httpCommunications[0]);
        });
    });
});