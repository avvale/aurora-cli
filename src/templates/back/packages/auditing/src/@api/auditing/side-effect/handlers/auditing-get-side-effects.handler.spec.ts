/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingGetSideEffectsHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingGetSideEffectsHandler', () =>
{
    let handler: AuditingGetSideEffectsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingGetSideEffectsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AuditingGetSideEffectsHandler>(AuditingGetSideEffectsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AuditingGetSideEffectsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingGetSideEffectsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a auditingMockSideEffectData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(auditingMockSideEffectData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(auditingMockSideEffectData);
        });
    });
});
