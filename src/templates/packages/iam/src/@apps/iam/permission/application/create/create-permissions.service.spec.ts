/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreatePermissionsService } from './create-permissions.service';
import { IPermissionRepository } from '../../domain/permission.repository';
import { MockPermissionRepository } from '../../infrastructure/mock/mock-permission.repository';

describe('CreatePermissionsService', () =>
{
    let service: CreatePermissionsService;
    let repository: IPermissionRepository;
    let mockRepository: MockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreatePermissionsService,
                MockPermissionRepository,
                {
                    provide : IPermissionRepository,
                    useValue: {
                        insert: (items) => { /**/ },
                    }
                },
            ]
        }).compile();

        service         = module.get(CreatePermissionsService);
        repository      = module.get(IPermissionRepository);
        mockRepository  = module.get(MockPermissionRepository);
    });

    describe('main', () =>
    {
        test('CreatePermissionsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create permissions and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});