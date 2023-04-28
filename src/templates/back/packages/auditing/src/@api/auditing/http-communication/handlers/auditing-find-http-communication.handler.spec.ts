/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingFindHttpCommunicationHandler } from './auditing-find-http-communication.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingFindHttpCommunicationHandler', () =>
{
    let handler: AuditingFindHttpCommunicationHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingFindHttpCommunicationHandler,
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

        handler = module.get<AuditingFindHttpCommunicationHandler>(AuditingFindHttpCommunicationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('AuditingFindHttpCommunicationHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingFindHttpCommunicationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a httpCommunication', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await handler.main()).toBe(httpCommunications[0]);
        });
    });
});