/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingUpdateHttpCommunicationsHandler } from '@api/auditing/http-communication';
import { AuditingUpdateHttpCommunicationsInput } from '@api/graphql';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateHttpCommunicationsHandler', () => {
    let handler: AuditingUpdateHttpCommunicationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingUpdateHttpCommunicationsHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<AuditingUpdateHttpCommunicationsHandler>(
            AuditingUpdateHttpCommunicationsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AuditingUpdateHttpCommunicationsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('AuditingUpdateHttpCommunicationsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a httpCommunications updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockHttpCommunicationData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <AuditingUpdateHttpCommunicationsInput>(
                        auditingMockHttpCommunicationData[0]
                    ),
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(auditingMockHttpCommunicationData[0]);
        });
    });
});
