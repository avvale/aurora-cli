/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingRollbackSideEffectHandler } from './auditing-rollback-side-effect.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

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