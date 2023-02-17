/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { AuditingRollbackSideEffectHandler } from './auditing-rollback-side-effect.handler';

describe('AuditingRollbackSideEffectHandler', () =>
{
    let handler: AuditingRollbackSideEffectHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingRollbackSideEffectHandler,
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

        handler     = module.get<AuditingRollbackSideEffectHandler>(AuditingRollbackSideEffectHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AuditingRollbackSideEffectHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});