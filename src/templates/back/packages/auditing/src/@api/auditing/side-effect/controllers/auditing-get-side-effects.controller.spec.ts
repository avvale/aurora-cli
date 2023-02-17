/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingGetSideEffectsController } from './auditing-get-side-effects.controller';
import { AuditingGetSideEffectsHandler } from '../handlers/auditing-get-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingGetSideEffectsController', () =>
{
    let controller: AuditingGetSideEffectsController;
    let handler: AuditingGetSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingGetSideEffectsController,
            ],
            providers: [
                {
                    provide : AuditingGetSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingGetSideEffectsController>(AuditingGetSideEffectsController);
        handler = module.get<AuditingGetSideEffectsHandler>(AuditingGetSideEffectsHandler);
    });

    describe('main', () =>
    {
        test('AuditingGetSideEffectsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a sideEffects', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects)));
            expect(await controller.main()).toBe(sideEffects);
        });
    });
});