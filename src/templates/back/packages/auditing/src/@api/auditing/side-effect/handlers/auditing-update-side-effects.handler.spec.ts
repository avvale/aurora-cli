/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingUpdateSideEffectsHandler } from '@api/auditing/side-effect';
import { AuditingUpdateSideEffectsInput } from '@api/graphql';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateSideEffectsHandler', () => {
    let handler: AuditingUpdateSideEffectsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingUpdateSideEffectsHandler,
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

        handler = module.get<AuditingUpdateSideEffectsHandler>(
            AuditingUpdateSideEffectsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AuditingUpdateSideEffectsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('AuditingUpdateSideEffectsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a sideEffects updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockSideEffectData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <AuditingUpdateSideEffectsInput>(
                        auditingMockSideEffectData[0]
                    ),
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(auditingMockSideEffectData[0]);
        });
    });
});
