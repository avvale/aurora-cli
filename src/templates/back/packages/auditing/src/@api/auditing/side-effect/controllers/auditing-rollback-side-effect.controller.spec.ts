/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingRollbackSideEffectHandler } from '../handlers/auditing-rollback-side-effect.handler';
import { AuditingRollbackSideEffectController } from './auditing-rollback-side-effect.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingRollbackSideEffectController', () =>
{
    let controller: AuditingRollbackSideEffectController;
    let handler: AuditingRollbackSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingRollbackSideEffectController,
            ],
            providers: [
                {
                    provide : AuditingRollbackSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingRollbackSideEffectController>(AuditingRollbackSideEffectController);
        handler = module.get<AuditingRollbackSideEffectHandler>(AuditingRollbackSideEffectHandler);
    });

    describe('main', () =>
    {
        test('AuditingRollbackSideEffectController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});