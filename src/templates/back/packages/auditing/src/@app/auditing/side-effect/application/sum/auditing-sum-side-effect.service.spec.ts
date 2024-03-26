import { AuditingISideEffectRepository, AuditingMockSideEffectRepository } from '@app/auditing/side-effect';
import { AuditingSumSideEffectService } from '@app/auditing/side-effect/application/sum/auditing-sum-side-effect.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingSumSideEffectService', () =>
{
    let service: AuditingSumSideEffectService;
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
                AuditingSumSideEffectService,
                AuditingMockSideEffectRepository,
                {
                    provide : AuditingISideEffectRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingSumSideEffectService);
        repository = module.get(AuditingISideEffectRepository);
        mockRepository = module.get(AuditingMockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('AuditingSumSideEffectService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(repository, 'sum').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.sum(column))));
            expect(await service.main('id')).toBe(mockRepository.sum('id'));
        });
    });
});
