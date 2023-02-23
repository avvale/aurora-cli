/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingCreateSideEffectController } from './auditing-create-side-effect.controller';
import { AuditingCreateSideEffectHandler } from '../handlers/auditing-create-side-effect.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingCreateSideEffectController', () =>
{
    let controller: AuditingCreateSideEffectController;
    let handler: AuditingCreateSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingCreateSideEffectController,
            ],
            providers: [
                {
                    provide : AuditingCreateSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingCreateSideEffectController>(AuditingCreateSideEffectController);
        handler = module.get<AuditingCreateSideEffectHandler>(AuditingCreateSideEffectHandler);
    });

    describe('main', () =>
    {
        test('AuditingCreateSideEffectController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an sideEffect created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await controller.main(sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});