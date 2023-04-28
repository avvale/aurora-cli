/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingUpdateSideEffectsHandler } from './auditing-update-side-effects.handler';
import { AuditingUpdateSideEffectsInput } from '@api/graphql';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingUpdateSideEffectsHandler', () =>
{
    let handler: AuditingUpdateSideEffectsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingUpdateSideEffectsHandler,
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

        handler = module.get<AuditingUpdateSideEffectsHandler>(AuditingUpdateSideEffectsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('AuditingUpdateSideEffectsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingUpdateSideEffectsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a sideEffects updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await handler.main(<AuditingUpdateSideEffectsInput>sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});