/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingUpsertHttpCommunicationHandler } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpsertHttpCommunicationHandler', () =>
{
    let handler: AuditingUpsertHttpCommunicationHandler;
    let queryBus: IQueryBus;

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

        handler = module.get<AuditingUpsertHttpCommunicationHandler>(AuditingUpsertHttpCommunicationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AuditingUpsertHttpCommunicationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an httpCommunication upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(auditingMockHttpCommunicationData[0])));
            expect(
                await handler.main(
                    auditingMockHttpCommunicationData[0],
                    'Europe/Madrid',
                ))
                .toBe(auditingMockHttpCommunicationData[0]);
        });
    });
});
