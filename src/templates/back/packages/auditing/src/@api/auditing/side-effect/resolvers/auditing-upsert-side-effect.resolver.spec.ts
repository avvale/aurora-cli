/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingUpsertSideEffectHandler, AuditingUpsertSideEffectResolver } from '@api/auditing/side-effect';
import { AuditingUpdateSideEffectByIdInput } from '@api/graphql';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(auditingMockSideEffectData[0])));
            expect(await resolver.main(<AuditingUpdateSideEffectByIdInput>auditingMockSideEffectData[0])).toBe(auditingMockSideEffectData[0]);
        });
    });
});
