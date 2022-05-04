/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateScopesService } from './create-scopes.service';
import { IScopeRepository } from '../../domain/scope.repository';
import { MockScopeRepository } from '../../infrastructure/mock/mock-scope.repository';

describe('CreateScopesService', () =>
{
    let service: CreateScopesService;
    let repository: IScopeRepository;
    let mockRepository: MockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateScopesService,
                MockScopeRepository,
                {
                    provide : IScopeRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ]
        }).compile();

        service         = module.get(CreateScopesService);
        repository      = module.get(IScopeRepository);
        mockRepository  = module.get(MockScopeRepository);
    });

    describe('main', () =>
    {
        test('CreateScopesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create scopes and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource,
            )).toBe(undefined);
        });
    });
});