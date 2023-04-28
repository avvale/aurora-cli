import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingCreateHttpCommunicationsHandler } from './auditing-create-http-communications.handler';
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

describe('AuditingCreateHttpCommunicationsHandler', () =>
{
    let handler: AuditingCreateHttpCommunicationsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCreateHttpCommunicationsHandler,
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

        handler = module.get<AuditingCreateHttpCommunicationsHandler>(AuditingCreateHttpCommunicationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AuditingCreateHttpCommunicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an httpCommunications created', async () =>
        {
            expect(await handler.main(httpCommunications)).toBe(true);
        });
    });
});