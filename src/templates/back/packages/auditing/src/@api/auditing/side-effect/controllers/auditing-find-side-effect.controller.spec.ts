/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindSideEffectController } from './auditing-find-side-effect.controller';
import { AuditingFindSideEffectHandler } from '../handlers/auditing-find-side-effect.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingFindSideEffectController', () =>
{
    let controller: AuditingFindSideEffectController;
    let handler: AuditingFindSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingFindSideEffectController,
            ],
            providers: [
                {
                    provide : AuditingFindSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingFindSideEffectController>(AuditingFindSideEffectController);
        handler = module.get<AuditingFindSideEffectHandler>(AuditingFindSideEffectHandler);
    });

    describe('main', () =>
    {
        test('AuditingFindSideEffectController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a sideEffect', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await controller.main()).toBe(sideEffects[0]);
        });
    });
});