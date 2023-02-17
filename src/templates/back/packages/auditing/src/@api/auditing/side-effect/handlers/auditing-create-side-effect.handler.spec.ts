/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingCreateSideEffectHandler } from './auditing-create-side-effect.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingCreateSideEffectHandler', () =>
{
    let handler: AuditingCreateSideEffectHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingCreateSideEffectHandler,
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

        handler     = module.get<AuditingCreateSideEffectHandler>(AuditingCreateSideEffectHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AuditingCreateSideEffectHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an sideEffect created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await handler.main(sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});