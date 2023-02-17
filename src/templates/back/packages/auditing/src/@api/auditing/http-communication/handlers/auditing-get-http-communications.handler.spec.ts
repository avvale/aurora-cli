/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingGetHttpCommunicationsHandler } from './auditing-get-http-communications.handler';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingGetHttpCommunicationsHandler', () =>
{
    let handler: AuditingGetHttpCommunicationsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingGetHttpCommunicationsHandler,
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

        handler = module.get<AuditingGetHttpCommunicationsHandler>(AuditingGetHttpCommunicationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('AuditingGetHttpCommunicationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingGetHttpCommunicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a httpCommunications', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(httpCommunications)));
            expect(await handler.main()).toBe(httpCommunications);
        });
    });
});