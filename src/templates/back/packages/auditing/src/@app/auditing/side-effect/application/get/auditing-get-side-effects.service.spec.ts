import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AuditingGetSideEffectsService } from './auditing-get-side-effects.service';
import { AuditingISideEffectRepository } from '../../domain/auditing-side-effect.repository';
import { AuditingMockSideEffectRepository } from '../../infrastructure/mock/auditing-mock-side-effect.repository';

describe('AuditingGetSideEffectsService', () =>
{
    let service: AuditingGetSideEffectsService;
    let repository: AuditingISideEffectRepository;
    let mockRepository: AuditingMockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AuditingGetSideEffectsService,
                AuditingMockSideEffectRepository,
                {
                    provide : AuditingISideEffectRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingGetSideEffectsService);
        repository = module.get(AuditingISideEffectRepository);
        mockRepository = module.get(AuditingMockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('GetSideEffectsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get sideEffects', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
