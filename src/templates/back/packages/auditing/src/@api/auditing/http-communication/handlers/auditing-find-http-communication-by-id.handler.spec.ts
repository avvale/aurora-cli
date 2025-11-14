/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingFindHttpCommunicationByIdHandler } from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindHttpCommunicationByIdHandler', () => {
    let handler: AuditingFindHttpCommunicationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingFindHttpCommunicationByIdHandler,
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

        handler = module.get<AuditingFindHttpCommunicationByIdHandler>(
            AuditingFindHttpCommunicationByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AuditingFindHttpCommunicationByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('AuditingFindHttpCommunicationByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an httpCommunication by id', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockHttpCommunicationData[0]),
                    ),
            );
            expect(
                await handler.main(
                    auditingMockHttpCommunicationData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(auditingMockHttpCommunicationData[0]);
        });
    });
});
