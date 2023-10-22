import { AuditingCreateSideEffectsHandler, AuditingCreateSideEffectsResolver } from '@api/auditing/side-effect';
import { AuditingCreateSideEffectInput } from '@api/graphql';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateSideEffectsResolver', () =>
{
    let resolver: AuditingCreateSideEffectsResolver;

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
            expect(await resolver.main(<AuditingCreateSideEffectInput[]>auditingMockSideEffectData)).toBe(undefined);
        });
    });
});
