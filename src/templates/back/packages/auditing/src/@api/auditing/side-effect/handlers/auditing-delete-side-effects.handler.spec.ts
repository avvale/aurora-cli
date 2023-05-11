/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { AuditingDeleteSideEffectsHandler } from './auditing-delete-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingDeleteSideEffectsHandler', () =>
{
    let handler: AuditingDeleteSideEffectsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

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
        commandBus = module.get<ICommandBus>(ICommandBus);
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

        test('should return an sideEffects deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sideEffects)));
            expect(await handler.main()).toBe(sideEffects);
        });
    });
});