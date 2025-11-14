/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingFindSideEffectHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindSideEffectHandler', () => {
    let handler: AuditingFindSideEffectHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingFindSideEffectHandler,
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

        handler = module.get<AuditingFindSideEffectHandler>(
            AuditingFindSideEffectHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AuditingFindSideEffectHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('AuditingFindSideEffectHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a sideEffect', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockSideEffectData[0]),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                auditingMockSideEffectData[0],
            );
        });
    });
});
