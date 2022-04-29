/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteRolesService } from './delete-roles.service';
import { IRoleRepository } from '../../domain/role.repository';
import { MockRoleRepository } from '../../infrastructure/mock/mock-role.repository';

describe('DeleteRolesService', () =>
{
    let service: DeleteRolesService;
    let repository: IRoleRepository;
    let mockRepository: MockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteRolesService,
                MockRoleRepository,
                {
                    provide : IRoleRepository,
                    useValue: {
                        get   : (queryStatement) => { /**/ },
                        delete: (queryStatement) => { /**/ },
                    }
                },
            ],
        }).compile();

        service         = module.get(DeleteRolesService);
        repository      = module.get(IRoleRepository);
        mockRepository  = module.get(MockRoleRepository);
    });

    describe('main', () =>
    {
        test('DeleteRolesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete role and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});