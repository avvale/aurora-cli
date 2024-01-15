import { AuditingISideEffectRepository, auditingMockSideEffectData, AuditingMockSideEffectRepository } from '@app/auditing/side-effect';
import { AuditingFindSideEffectByIdService } from '@app/auditing/side-effect/application/find/auditing-find-side-effect-by-id.service';
import { AuditingSideEffectId } from '@app/auditing/side-effect/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindSideEffectByIdService', () =>
{
    let service: AuditingFindSideEffectByIdService;
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
                AuditingFindSideEffectByIdService,
                AuditingMockSideEffectRepository,
                {
                    provide : AuditingISideEffectRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingFindSideEffectByIdService);
        repository = module.get(AuditingISideEffectRepository);
        mockRepository = module.get(AuditingMockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('FindSideEffectByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find sideEffect by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AuditingSideEffectId(auditingMockSideEffectData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
