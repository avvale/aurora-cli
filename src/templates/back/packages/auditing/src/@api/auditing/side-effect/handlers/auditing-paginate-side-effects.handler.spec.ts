/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingPaginateSideEffectsHandler } from './auditing-paginate-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingPaginateSideEffectsHandler', () =>
{
    let handler: AuditingPaginateSideEffectsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

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
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AuditingPaginateSideEffectsHandler>(AuditingPaginateSideEffectsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
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
                total: sideEffects.length,
                count: sideEffects.length,
                rows : sideEffects,
            })));
            expect(await handler.main()).toEqual({
                total: sideEffects.length,
                count: sideEffects.length,
                rows : sideEffects,
            });
        });
    });
});