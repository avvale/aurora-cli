import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLScopesService } from './raw-sql-scopes.service';
import { IScopeRepository } from '../../domain/scope.repository';
import { MockScopeRepository } from '../../infrastructure/mock/mock-scope.repository';

describe('RawSQLScopesService', () =>
{
    let service: RawSQLScopesService;
    let repository: IScopeRepository;
    let mockRepository: MockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLScopesService,
                MockScopeRepository,
                {
                    provide : IScopeRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLScopesService);
        repository      = module.get(IScopeRepository);
        mockRepository  = module.get(MockScopeRepository);
    });

    describe('main', () =>
    {
        test('RawSQLScopesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get scopes', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});