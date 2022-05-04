/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeletePermissionsService } from './delete-permissions.service';
import { IPermissionRepository } from '../../domain/permission.repository';
import { MockPermissionRepository } from '../../infrastructure/mock/mock-permission.repository';

describe('DeletePermissionsService', () =>
{
    let service: DeletePermissionsService;
    let repository: IPermissionRepository;
    let mockRepository: MockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeletePermissionsService,
                MockPermissionRepository,
                {
                    provide : IPermissionRepository,
                    useValue: {
                        get   : (queryStatement) => { /**/ },
                        delete: (queryStatement) => { /**/ },
                    }
                },
            ],
        }).compile();

        service         = module.get(DeletePermissionsService);
        repository      = module.get(IPermissionRepository);
        mockRepository  = module.get(MockPermissionRepository);
    });

    describe('main', () =>
    {
        test('DeletePermissionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete permission and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});