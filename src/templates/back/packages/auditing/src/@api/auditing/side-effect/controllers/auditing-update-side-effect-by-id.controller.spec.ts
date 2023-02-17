/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpdateSideEffectByIdController } from './auditing-update-side-effect-by-id.controller';
import { AuditingUpdateSideEffectByIdHandler } from '../handlers/auditing-update-side-effect-by-id.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingUpdateSideEffectByIdController', () =>
{
    let controller: AuditingUpdateSideEffectByIdController;
    let handler: AuditingUpdateSideEffectByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingUpdateSideEffectByIdController,
            ],
            providers: [
                {
                    provide : AuditingUpdateSideEffectByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingUpdateSideEffectByIdController>(AuditingUpdateSideEffectByIdController);
        handler = module.get<AuditingUpdateSideEffectByIdHandler>(AuditingUpdateSideEffectByIdHandler);
    });

    describe('main', () =>
    {
        test('AuditingUpdateSideEffectByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a sideEffect updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await controller.main(sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});