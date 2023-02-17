/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingDeleteHttpCommunicationByIdHandler } from './auditing-delete-http-communication-by-id.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingDeleteHttpCommunicationByIdController', () =>
{
    let handler: AuditingDeleteHttpCommunicationByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingDeleteHttpCommunicationByIdHandler,
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

        handler = module.get<AuditingDeleteHttpCommunicationByIdHandler>(AuditingDeleteHttpCommunicationByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AuditingDeleteHttpCommunicationByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an httpCommunication deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await handler.main(httpCommunications[0].id)).toBe(httpCommunications[0]);
        });
    });
});