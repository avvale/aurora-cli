/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteSideEffectsController } from './auditing-delete-side-effects.controller';
import { AuditingDeleteSideEffectsHandler } from '../handlers/auditing-delete-side-effects.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingDeleteSideEffectsController', () =>
{
    let controller: AuditingDeleteSideEffectsController;
    let handler: AuditingDeleteSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingDeleteSideEffectsController,
            ],
            providers: [
                {
                    provide : AuditingDeleteSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingDeleteSideEffectsController>(AuditingDeleteSideEffectsController);
        handler = module.get<AuditingDeleteSideEffectsHandler>(AuditingDeleteSideEffectsHandler);
    });

    describe('main', () =>
    {
        test('AuditingDeleteSideEffectsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an sideEffects deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects)));
            expect(await controller.main()).toBe(sideEffects);
        });
    });
});