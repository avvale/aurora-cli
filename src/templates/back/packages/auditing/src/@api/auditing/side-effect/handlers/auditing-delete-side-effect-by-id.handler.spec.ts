/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { AuditingDeleteSideEffectByIdHandler } from './auditing-delete-side-effect-by-id.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingDeleteSideEffectByIdController', () =>
{
    let handler: AuditingDeleteSideEffectByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingDeleteSideEffectByIdHandler,
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

        handler = module.get<AuditingDeleteSideEffectByIdHandler>(AuditingDeleteSideEffectByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AuditingDeleteSideEffectByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an sideEffect deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await handler.main(sideEffects[0].id)).toBe(sideEffects[0]);
        });
    });
});