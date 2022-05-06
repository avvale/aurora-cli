import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';
import { FindScopeByIdService } from './find-scope-by-id.service';
import { ScopeId } from '../../domain/value-objects';
import { IScopeRepository } from '../../domain/scope.repository';
import { MockScopeRepository } from '../../infrastructure/mock/mock-scope.repository';

describe('FindScopeByIdService', () =>
{
    let service: FindScopeByIdService;
    let repository: IScopeRepository;
    let mockRepository: MockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindScopeByIdService,
                MockScopeRepository,
                {
                    provide : IScopeRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(FindScopeByIdService);
        repository      = module.get(IScopeRepository);
        mockRepository  = module.get(MockScopeRepository);
    });

    describe('main', () =>
    {
        test('FindScopeByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find scope by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ScopeId(scopes[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});