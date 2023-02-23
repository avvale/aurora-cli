/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteSideEffectByIdController } from './auditing-delete-side-effect-by-id.controller';
import { AuditingDeleteSideEffectByIdHandler } from '../handlers/auditing-delete-side-effect-by-id.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingDeleteSideEffectByIdController', () =>
{
    let controller: AuditingDeleteSideEffectByIdController;
    let handler: AuditingDeleteSideEffectByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingDeleteSideEffectByIdController,
            ],
            providers: [
                {
                    provide : AuditingDeleteSideEffectByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingDeleteSideEffectByIdController>(AuditingDeleteSideEffectByIdController);
        handler = module.get<AuditingDeleteSideEffectByIdHandler>(AuditingDeleteSideEffectByIdHandler);
    });

    describe('main', () =>
    {
        test('AuditingDeleteSideEffectByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an sideEffect deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await controller.main(sideEffects[0].id)).toBe(sideEffects[0]);
        });
    });
});