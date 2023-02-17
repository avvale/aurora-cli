import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingCreateSideEffectsController } from './auditing-create-side-effects.controller';
import { AuditingCreateSideEffectsHandler } from '../handlers/auditing-create-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingCreateSideEffectsController', () =>
{
    let controller: AuditingCreateSideEffectsController;
    let handler: AuditingCreateSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AuditingCreateSideEffectsController,
            ],
            providers: [
                {
                    provide : AuditingCreateSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingCreateSideEffectsController>(AuditingCreateSideEffectsController);
        handler = module.get<AuditingCreateSideEffectsHandler>(AuditingCreateSideEffectsHandler);
    });

    describe('main', () =>
    {
        test('AuditingCreateSideEffectsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an sideEffects created', async () =>
        {
            expect(await controller.main(sideEffects)).toBe(undefined);
        });
    });
});