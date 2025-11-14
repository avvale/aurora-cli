/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingGetHttpCommunicationsHandler } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingGetHttpCommunicationsHandler', () => {
    let handler: AuditingGetHttpCommunicationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingGetHttpCommunicationsHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<AuditingGetHttpCommunicationsHandler>(
            AuditingGetHttpCommunicationsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AuditingGetHttpCommunicationsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('AuditingGetHttpCommunicationsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a auditingMockHttpCommunicationData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockHttpCommunicationData),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                auditingMockHttpCommunicationData,
            );
        });
    });
});
