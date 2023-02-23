/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingUpdateSideEffectByIdHandler } from './auditing-update-side-effect-by-id.handler';
import { AuditingUpdateSideEffectByIdInput } from '@api/graphql';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingUpdateSideEffectByIdHandler', () =>
{
    let handler: AuditingUpdateSideEffectByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingUpdateSideEffectByIdHandler,
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

        handler     = module.get<AuditingUpdateSideEffectByIdHandler>(AuditingUpdateSideEffectByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('AuditingUpdateSideEffectByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingUpdateSideEffectByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a sideEffect updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await handler.main(<AuditingUpdateSideEffectByIdInput>sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});