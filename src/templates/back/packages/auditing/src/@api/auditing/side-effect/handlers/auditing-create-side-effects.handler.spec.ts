import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingCreateSideEffectsHandler } from './auditing-create-side-effects.handler';
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingCreateSideEffectsHandler', () =>
{
    let handler: AuditingCreateSideEffectsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCreateSideEffectsHandler,
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

        handler     = module.get<AuditingCreateSideEffectsHandler>(AuditingCreateSideEffectsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AuditingCreateSideEffectsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an sideEffects created', async () =>
        {
            expect(await handler.main(sideEffects)).toBe(true);
        });
    });
});