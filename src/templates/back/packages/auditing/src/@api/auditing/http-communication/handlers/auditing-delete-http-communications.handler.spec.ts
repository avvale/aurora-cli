/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { AuditingDeleteHttpCommunicationsHandler } from './auditing-delete-http-communications.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingDeleteHttpCommunicationsHandler', () =>
{
    let handler: AuditingDeleteHttpCommunicationsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingDeleteHttpCommunicationsHandler,
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

        handler = module.get<AuditingDeleteHttpCommunicationsHandler>(AuditingDeleteHttpCommunicationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('AuditingDeleteHttpCommunicationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingDeleteHttpCommunicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an httpCommunications deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(httpCommunications)));
            expect(await handler.main()).toBe(httpCommunications);
        });
    });
});