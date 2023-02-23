/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AuditingUpsertSideEffectResolver } from './auditing-upsert-side-effect.resolver';
import { AuditingUpsertSideEffectHandler } from '../handlers/auditing-upsert-side-effect.handler';
import { AuditingUpdateSideEffectByIdInput } from '@api/graphql';

// sources
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

describe('AuditingUpsertSideEffectResolver', () =>
{
    let resolver: AuditingUpsertSideEffectResolver;
    let handler: AuditingUpsertSideEffectHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AuditingUpsertSideEffectResolver,
                {
                    provide : AuditingUpsertSideEffectHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AuditingUpsertSideEffectResolver>(AuditingUpsertSideEffectResolver);
        handler = module.get<AuditingUpsertSideEffectHandler>(AuditingUpsertSideEffectHandler);
    });

    test('AuditingUpsertSideEffectResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AuditingUpsertSideEffectResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an sideEffect upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(sideEffects[0])));
            expect(await resolver.main(<AuditingUpdateSideEffectByIdInput>sideEffects[0])).toBe(sideEffects[0]);
        });
    });
});