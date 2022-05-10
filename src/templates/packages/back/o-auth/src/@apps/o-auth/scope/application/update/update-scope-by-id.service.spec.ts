/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';
import { UpdateScopeByIdService } from './update-scope-by-id.service';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '../../domain/value-objects';
import { IScopeRepository } from '../../domain/scope.repository';
import { MockScopeRepository } from '../../infrastructure/mock/mock-scope.repository';

describe('UpdateScopeByIdService', () =>
{
    let service: UpdateScopeByIdService;
    let repository: IScopeRepository;
    let mockRepository: MockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateScopeByIdService,
                MockScopeRepository,
                {
                    provide : IScopeRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateScopeByIdService);
        repository      = module.get(IScopeRepository);
        mockRepository  = module.get(MockScopeRepository);
    });

    describe('main', () =>
    {
        test('UpdateScopeByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a scope and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new ScopeId(scopes[0].id),
                    code: new ScopeCode(scopes[0].code),
                    name: new ScopeName(scopes[0].name),
                },
            )).toBe(undefined);
        });
    });
});