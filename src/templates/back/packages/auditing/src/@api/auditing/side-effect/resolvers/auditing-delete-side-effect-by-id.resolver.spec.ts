/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingDeleteSideEffectByIdResolver } from './auditing-delete-side-effect-by-id.resolver';
import { AuditingDeleteSideEffectByIdHandler } from '../handlers/auditing-delete-side-effect-by-id.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingDeleteSideEffectByIdResolver', () =>
{
    let resolver: AuditingDeleteSideEffectByIdResolver;
    let handler: AuditingDeleteSideEffectByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingDeleteSideEffectByIdResolver,
                {
                    provide : AuditingDeleteSideEffectByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingDeleteSideEffectByIdResolver>(AuditingDeleteSideEffectByIdResolver);
        handler = module.get<AuditingDeleteSideEffectByIdHandler>(AuditingDeleteSideEffectByIdHandler);
    });

    test('AuditingDeleteSideEffectByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingDeleteSideEffectByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an sideEffect deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await resolver.main(sideEffects[0].id)).toBe(sideEffects[0]);
        });
    });
});