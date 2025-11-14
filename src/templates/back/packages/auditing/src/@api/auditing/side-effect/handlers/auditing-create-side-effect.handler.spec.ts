/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingCreateSideEffectHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateSideEffectHandler', () => {
    let handler: AuditingCreateSideEffectHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingCreateSideEffectHandler,
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

        handler = module.get<AuditingCreateSideEffectHandler>(
            AuditingCreateSideEffectHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('AuditingCreateSideEffectHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an sideEffect created', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockSideEffectData[0]),
                    ),
            );
            expect(
                await handler.main(
                    auditingMockSideEffectData[0],
                    'Europe/Madrid',
                ),
            ).toBe(auditingMockSideEffectData[0]);
        });
    });
});
