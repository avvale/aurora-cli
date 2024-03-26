import { AuditingISideEffectRepository, AuditingMockSideEffectRepository } from '@app/auditing/side-effect';
import { AuditingMinSideEffectService } from '@app/auditing/side-effect/application/min/auditing-min-side-effect.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingMinSideEffectService', () =>
{
    let service: AuditingMinSideEffectService;
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
                AuditingMinSideEffectService,
                AuditingMockSideEffectRepository,
                {
                    provide : AuditingISideEffectRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingMinSideEffectService);
        repository = module.get(AuditingISideEffectRepository);
        mockRepository = module.get(AuditingMockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('AuditingMinSideEffectService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(repository, 'min').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.min(column))));
            expect(await service.main('id')).toBe(mockRepository.min('id'));
        });
    });
});
