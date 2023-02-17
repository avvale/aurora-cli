import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingCreateSideEffectsResolver } from './auditing-create-side-effects.resolver';
import { AuditingCreateSideEffectsHandler } from '../handlers/auditing-create-side-effects.handler';
import { AuditingCreateSideEffectInput } from '@api/graphql';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

describe('AuditingCreateSideEffectsResolver', () =>
{
    let resolver: AuditingCreateSideEffectsResolver;
    let handler: AuditingCreateSideEffectsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingCreateSideEffectsResolver,
                {
                    provide : AuditingCreateSideEffectsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingCreateSideEffectsResolver>(AuditingCreateSideEffectsResolver);
        handler = module.get<AuditingCreateSideEffectsHandler>(AuditingCreateSideEffectsHandler);
    });

    test('AuditingCreateSideEffectsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingCreateSideEffectsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an sideEffects created', async () =>
        {
            expect(await resolver.main(<AuditingCreateSideEffectInput[]>sideEffects)).toBe(undefined);
        });
    });
});