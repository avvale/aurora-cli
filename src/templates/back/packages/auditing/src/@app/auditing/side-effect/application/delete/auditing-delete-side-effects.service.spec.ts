/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AuditingISideEffectRepository,
    AuditingMockSideEffectRepository,
} from '@app/auditing/side-effect';
import { AuditingDeleteSideEffectsService } from '@app/auditing/side-effect/application/delete/auditing-delete-side-effects.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteSideEffectsService', () => {
    let service: AuditingDeleteSideEffectsService;
    let repository: AuditingISideEffectRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AuditingDeleteSideEffectsService,
                AuditingMockSideEffectRepository,
                {
                    provide: AuditingISideEffectRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(AuditingDeleteSideEffectsService);
        repository = module.get(AuditingISideEffectRepository);
    });

    describe('main', () => {
        test('AuditingDeleteSideEffectsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete sideEffect and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});
