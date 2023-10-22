/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingDeleteSideEffectsHandler } from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteSideEffectsHandler', () =>
{
    let handler: AuditingDeleteSideEffectsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingDeleteSideEffectsHandler,
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

        handler = module.get<AuditingDeleteSideEffectsHandler>(AuditingDeleteSideEffectsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AuditingDeleteSideEffectsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingDeleteSideEffectsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an auditingMockSideEffectData deleted', async () =>
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
