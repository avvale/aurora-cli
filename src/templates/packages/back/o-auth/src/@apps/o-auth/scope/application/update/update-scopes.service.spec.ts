/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';
import { UpdateScopesService } from './update-scopes.service';
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

describe('UpdateScopesService', () =>
{
    let service: UpdateScopesService;
    let repository: IScopeRepository;
    let mockRepository: MockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateScopesService,
                MockScopeRepository,
                {
                    provide : IScopeRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateScopesService);
        repository      = module.get(IScopeRepository);
        mockRepository  = module.get(MockScopeRepository);
    });

    describe('main', () =>
    {
        test('UpdateScopesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a scopes and emit event', async () =>
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