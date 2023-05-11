/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { AuditingGetSideEffectsHandler } from './auditing-get-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingGetSideEffectsHandler', () =>
{
    let handler: AuditingGetSideEffectsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

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
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AuditingGetSideEffectsHandler>(AuditingGetSideEffectsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
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

        test('should return a sideEffects', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sideEffects)));
            expect(await handler.main()).toBe(sideEffects);
        });
    });
});