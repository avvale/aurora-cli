/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingFindSideEffectResolver } from './auditing-find-side-effect.resolver';
import { AuditingFindSideEffectHandler } from '../handlers/auditing-find-side-effect.handler';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingFindSideEffectResolver', () =>
{
    let resolver: AuditingFindSideEffectResolver;
    let handler: AuditingFindSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingFindSideEffectResolver,
                {
                    provide : AuditingFindSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingFindSideEffectResolver>(AuditingFindSideEffectResolver);
        handler = module.get<AuditingFindSideEffectHandler>(AuditingFindSideEffectHandler);
    });

    test('AuditingFindSideEffectResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingFindSideEffectResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a sideEffect', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await resolver.main()).toBe(sideEffects[0]);
        });
    });
});