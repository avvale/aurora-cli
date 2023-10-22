import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AuditingRawSQLSideEffectsService } from './auditing-raw-sql-side-effects.service';
import { AuditingISideEffectRepository } from '../../domain/auditing-side-effect.repository';
import { AuditingMockSideEffectRepository } from '../../infrastructure/mock/auditing-mock-side-effect.repository';

describe('AuditingRawSQLSideEffectsService ', () =>
{
    let service: AuditingRawSQLSideEffectsService ;
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
                AuditingRawSQLSideEffectsService ,
                AuditingMockSideEffectRepository,
                {
                    provide : AuditingISideEffectRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AuditingRawSQLSideEffectsService );
        repository      = module.get(AuditingISideEffectRepository);
        mockRepository  = module.get(AuditingMockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('RawSQLSideEffectsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get sideEffects', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
