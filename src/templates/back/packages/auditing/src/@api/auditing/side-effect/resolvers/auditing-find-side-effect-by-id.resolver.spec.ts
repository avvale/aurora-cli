/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindSideEffectByIdResolver } from './auditing-find-side-effect-by-id.resolver';
import { AuditingFindSideEffectByIdHandler } from '../handlers/auditing-find-side-effect-by-id.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingFindSideEffectByIdResolver', () =>
{
    let resolver: AuditingFindSideEffectByIdResolver;
    let handler: AuditingFindSideEffectByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingFindSideEffectByIdResolver,
                {
                    provide : AuditingFindSideEffectByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingFindSideEffectByIdResolver>(AuditingFindSideEffectByIdResolver);
        handler = module.get<AuditingFindSideEffectByIdHandler>(AuditingFindSideEffectByIdHandler);
    });

    test('AuditingFindSideEffectByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingFindSideEffectByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an sideEffect by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await resolver.main(sideEffects[0].id)).toBe(sideEffects[0]);
        });
    });
});