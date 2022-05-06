/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { scopes } from '../../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';
import { DeleteScopeByIdService } from './delete-scope-by-id.service';
import { ScopeId } from '../../domain/value-objects';
import { IScopeRepository } from '../../domain/scope.repository';
import { MockScopeRepository } from '../../infrastructure/mock/mock-scope.repository';

describe('DeleteScopeByIdService', () =>
{
    let service: DeleteScopeByIdService;
    let repository: IScopeRepository;
    let mockRepository: MockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteScopeByIdService,
                MockScopeRepository,
                {
                    provide : IScopeRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(DeleteScopeByIdService);
        repository      = module.get(IScopeRepository);
        mockRepository  = module.get(MockScopeRepository);
    });

    describe('main', () =>
    {
        test('DeleteScopeByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete scope and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ScopeId(scopes[0].id),
            )).toBe(undefined);
        });
    });
});