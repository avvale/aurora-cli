/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AuditingUpdateSideEffectByIdHandler,
    AuditingUpdateSideEffectByIdResolver,
} from '@api/auditing/side-effect';
import { AuditingUpdateSideEffectByIdInput } from '@api/graphql';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateSideEffectByIdResolver', () => {
    let resolver: AuditingUpdateSideEffectByIdResolver;
    let handler: AuditingUpdateSideEffectByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                AuditingUpdateSideEffectByIdResolver,
                {
                    provide: AuditingUpdateSideEffectByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<AuditingUpdateSideEffectByIdResolver>(
            AuditingUpdateSideEffectByIdResolver,
        );
        handler = module.get<AuditingUpdateSideEffectByIdHandler>(
            AuditingUpdateSideEffectByIdHandler,
        );
    });

    test('AuditingUpdateSideEffectByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('AuditingUpdateSideEffectByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a sideEffect by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(auditingMockSideEffectData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <AuditingUpdateSideEffectByIdInput>(
                        auditingMockSideEffectData[0]
                    ),
                ),
            ).toBe(auditingMockSideEffectData[0]);
        });
    });
});
