/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingUpdateHttpCommunicationsHandler } from './auditing-update-http-communications.handler';
import { AuditingUpdateHttpCommunicationsInput } from '@api/graphql';

// sources
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

describe('AuditingUpdateHttpCommunicationsHandler', () =>
{
    let handler: AuditingUpdateHttpCommunicationsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingUpdateHttpCommunicationsHandler,
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

        handler     = module.get<AuditingUpdateHttpCommunicationsHandler>(AuditingUpdateHttpCommunicationsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AuditingUpdateHttpCommunicationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingUpdateHttpCommunicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a httpCommunications updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(httpCommunications[0])));
            expect(await handler.main(<AuditingUpdateHttpCommunicationsInput>httpCommunications[0])).toBe(httpCommunications[0]);
        });
    });
});