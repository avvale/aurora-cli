/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AuditingCreateSideEffectsService } from './auditing-create-side-effects.service';
import { AuditingISideEffectRepository } from '../../domain/auditing-side-effect.repository';
import { AuditingMockSideEffectRepository } from '../../infrastructure/mock/auditing-mock-side-effect.repository';

describe('AuditingCreateSideEffectsService', () =>
{
    let service: AuditingCreateSideEffectsService;
    let mockRepository: AuditingMockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AuditingCreateSideEffectsService,
                AuditingMockSideEffectRepository,
                {
                    provide : AuditingISideEffectRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingCreateSideEffectsService);
        mockRepository = module.get(AuditingMockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('CreateSideEffectsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create sideEffects and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
