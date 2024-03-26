import { AuditingISideEffectRepository, AuditingMockSideEffectRepository } from '@app/auditing/side-effect';
import { AuditingCountSideEffectService } from '@app/auditing/side-effect/application/count/auditing-count-side-effect.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCountSideEffectService', () =>
{
    let service: AuditingCountSideEffectService;
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
                AuditingCountSideEffectService,
                AuditingMockSideEffectRepository,
                {
                    provide : AuditingISideEffectRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingCountSideEffectService);
        repository = module.get(AuditingISideEffectRepository);
        mockRepository = module.get(AuditingMockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('AuditingCountSideEffectService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () =>
        {
            jest.spyOn(repository, 'count').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource.length)));
            expect(await service.main()).toBe(mockRepository.collectionSource.length);
        });
    });
});
