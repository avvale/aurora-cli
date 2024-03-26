import { AuditingISideEffectRepository, AuditingMockSideEffectRepository } from '@app/auditing/side-effect';
import { AuditingMaxSideEffectService } from '@app/auditing/side-effect/application/max/auditing-max-side-effect.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingMaxSideEffectService', () =>
{
    let service: AuditingMaxSideEffectService;
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
                AuditingMaxSideEffectService,
                AuditingMockSideEffectRepository,
                {
                    provide : AuditingISideEffectRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingMaxSideEffectService);
        repository = module.get(AuditingISideEffectRepository);
        mockRepository = module.get(AuditingMockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('AuditingMaxSideEffectService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(repository, 'max').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.max(column))));
            expect(await service.main('id')).toBe(mockRepository.max('id'));
        });
    });
});
