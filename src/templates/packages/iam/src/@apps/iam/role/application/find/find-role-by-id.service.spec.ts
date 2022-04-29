import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { roles } from '../../../../../@apps/iam/role/infrastructure/seeds/role.seed';
import { FindRoleByIdService } from './find-role-by-id.service';
import { RoleId } from '../../domain/value-objects';
import { IRoleRepository } from '../../domain/role.repository';
import { MockRoleRepository } from '../../infrastructure/mock/mock-role.repository';

describe('FindRoleByIdService', () =>
{
    let service: FindRoleByIdService;
    let repository: IRoleRepository;
    let mockRepository: MockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindRoleByIdService,
                MockRoleRepository,
                {
                    provide: IRoleRepository,
                    useValue: {
                        findById: id => { /**/ }
                    }
                }
            ]
        }).compile();

        service         = module.get(FindRoleByIdService);
        repository      = module.get(IRoleRepository);
        mockRepository  = module.get(MockRoleRepository);
    });

    describe('main', () =>
    {
        test('FindRoleByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find role by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new RoleId(roles[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});