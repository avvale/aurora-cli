/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingPaginateHttpCommunicationsHandler } from './auditing-paginate-http-communications.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingPaginateHttpCommunicationsHandler', () =>
{
    let handler: AuditingPaginateHttpCommunicationsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingPaginateHttpCommunicationsHandler,
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

        handler = module.get<AuditingPaginateHttpCommunicationsHandler>(AuditingPaginateHttpCommunicationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('AuditingPaginateHttpCommunicationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingPaginateHttpCommunicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a httpCommunications', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: httpCommunications.length,
                count: httpCommunications.length,
                rows : httpCommunications,
            })));
            expect(await handler.main()).toEqual({
                total: httpCommunications.length,
                count: httpCommunications.length,
                rows : httpCommunications,
            });
        });
    });
});