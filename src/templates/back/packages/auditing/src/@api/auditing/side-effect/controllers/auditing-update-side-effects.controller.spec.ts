/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpdateSideEffectsController } from './auditing-update-side-effects.controller';
import { AuditingUpdateSideEffectsHandler } from '../handlers/auditing-update-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingUpdateSideEffectsController', () =>
{
    let controller: AuditingUpdateSideEffectsController;
    let handler: AuditingUpdateSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingUpdateSideEffectsController,
            ],
            providers: [
                {
                    provide : AuditingUpdateSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingUpdateSideEffectsController>(AuditingUpdateSideEffectsController);
        handler = module.get<AuditingUpdateSideEffectsHandler>(AuditingUpdateSideEffectsHandler);
    });

    describe('main', () =>
    {
        test('AuditingUpdateSideEffectsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a sideEffects updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await controller.main(sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});