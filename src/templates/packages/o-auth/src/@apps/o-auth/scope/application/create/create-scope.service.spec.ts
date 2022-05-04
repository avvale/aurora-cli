/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { scopes } from '../../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';
import { CreateScopeService } from './create-scope.service';
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

describe('CreateScopeService', () =>

{
    let service: CreateScopeService;
    let repository: IScopeRepository;
    let mockRepository: MockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateScopeService,
                MockScopeRepository,
                {
                    provide : IScopeRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        }).compile();

        service         = module.get(CreateScopeService);
        repository      = module.get(IScopeRepository);
        mockRepository  = module.get(MockScopeRepository);
    });

    describe('main', () =>
    {
        test('CreateScopeService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a scope and emit event', async () =>
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