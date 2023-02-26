import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLRolesService } from './raw-sql-roles.service';
import { IRoleRepository } from '../../domain/role.repository';
import { MockRoleRepository } from '../../infrastructure/mock/mock-role.repository';

describe('RawSQLRolesService', () =>
{
    let service: RawSQLRolesService;
    let repository: IRoleRepository;
    let mockRepository: MockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLRolesService,
                MockRoleRepository,
                {
                    provide : IRoleRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLRolesService);
        repository      = module.get(IRoleRepository);
        mockRepository  = module.get(MockRoleRepository);
    });

    describe('main', () =>
    {
        test('RawSQLRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get roles', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});