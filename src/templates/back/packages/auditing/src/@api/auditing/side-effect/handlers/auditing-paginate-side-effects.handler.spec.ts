/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingPaginateSideEffectsHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingPaginateSideEffectsHandler', () =>
{
    let handler: AuditingPaginateSideEffectsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingPaginateSideEffectsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AuditingPaginateSideEffectsHandler>(AuditingPaginateSideEffectsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AuditingPaginateSideEffectsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingPaginateSideEffectsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a sideEffects', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: auditingMockSideEffectData.length,
                count: auditingMockSideEffectData.length,
                rows : auditingMockSideEffectData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: auditingMockSideEffectData.length,
                    count: auditingMockSideEffectData.length,
                    rows : auditingMockSideEffectData,
                });
        });
    });
});
