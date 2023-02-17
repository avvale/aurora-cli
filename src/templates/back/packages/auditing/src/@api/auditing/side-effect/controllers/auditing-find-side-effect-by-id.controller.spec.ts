/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindSideEffectByIdController } from './auditing-find-side-effect-by-id.controller';
import { AuditingFindSideEffectByIdHandler } from '../handlers/auditing-find-side-effect-by-id.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingFindSideEffectByIdController', () =>
{
    let controller: AuditingFindSideEffectByIdController;
    let handler: AuditingFindSideEffectByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingFindSideEffectByIdController,
            ],
            providers: [
                {
                    provide : AuditingFindSideEffectByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingFindSideEffectByIdController>(AuditingFindSideEffectByIdController);
        handler = module.get<AuditingFindSideEffectByIdHandler>(AuditingFindSideEffectByIdHandler);
    });

    describe('main', () =>
    {
        test('AuditingFindSideEffectByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an sideEffect by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await controller.main(sideEffects[0].id)).toBe(sideEffects[0]);
        });
    });
});