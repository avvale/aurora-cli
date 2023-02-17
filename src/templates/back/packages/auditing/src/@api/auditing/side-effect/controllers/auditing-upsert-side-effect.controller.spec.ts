/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpsertSideEffectController } from './auditing-upsert-side-effect.controller';
import { AuditingUpsertSideEffectHandler } from '../handlers/auditing-upsert-side-effect.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingUpsertSideEffectController', () =>
{
    let controller: AuditingUpsertSideEffectController;
    let handler: AuditingUpsertSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AuditingUpsertSideEffectController,
            ],
            providers: [
                {
                    provide : AuditingUpsertSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AuditingUpsertSideEffectController>(AuditingUpsertSideEffectController);
        handler = module.get<AuditingUpsertSideEffectHandler>(AuditingUpsertSideEffectHandler);
    });

    describe('main', () =>
    {
        test('AuditingUpsertSideEffectController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an sideEffect upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await controller.main(sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});