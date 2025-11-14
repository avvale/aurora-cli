/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AuditingCreateSideEffectHandler,
    AuditingCreateSideEffectResolver,
} from '@api/auditing/side-effect';
import { AuditingCreateSideEffectInput } from '@api/graphql';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateSideEffectResolver', () => {
    let resolver: AuditingCreateSideEffectResolver;
    let handler: AuditingCreateSideEffectHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingCreateSideEffectResolver,
                {
                    provide: AuditingCreateSideEffectHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<AuditingCreateSideEffectResolver>(
            AuditingCreateSideEffectResolver,
        );
        handler = module.get<AuditingCreateSideEffectHandler>(
            AuditingCreateSideEffectHandler,
        );
    });

    test('AuditingCreateSideEffectResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('AuditingCreateSideEffectResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an sideEffect created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockSideEffectData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <AuditingCreateSideEffectInput>(
                        auditingMockSideEffectData[0]
                    ),
                ),
            ).toBe(auditingMockSideEffectData[0]);
        });
    });
});
