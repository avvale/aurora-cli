/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateRolesService } from './create-roles.service';
import { IRoleRepository } from '../../domain/role.repository';
import { MockRoleRepository } from '../../infrastructure/mock/mock-role.repository';

describe('CreateRolesService', () =>
{
    let service: CreateRolesService;
    let repository: IRoleRepository;
    let mockRepository: MockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateRolesService,
                MockRoleRepository,
                {
                    provide : IRoleRepository,
                    useValue: {
                        insert: (items) => { /**/ },
                    }
                },
            ]
        }).compile();

        service         = module.get(CreateRolesService);
        repository      = module.get(IRoleRepository);
        mockRepository  = module.get(MockRoleRepository);
    });

    describe('main', () =>
    {
        test('CreateRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create roles and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});