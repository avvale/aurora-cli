/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { permissions } from '../../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';
import { DeletePermissionByIdService } from './delete-permission-by-id.service';
import { PermissionId } from '../../domain/value-objects';
import { IPermissionRepository } from '../../domain/permission.repository';
import { MockPermissionRepository } from '../../infrastructure/mock/mock-permission.repository';

describe('DeletePermissionByIdService', () =>
{
    let service: DeletePermissionByIdService;
    let repository: IPermissionRepository;
    let mockRepository: MockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeletePermissionByIdService,
                MockPermissionRepository,
                {
                    provide : IPermissionRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    }
                },
            ]
        }).compile();

        service         = module.get(DeletePermissionByIdService);
        repository      = module.get(IPermissionRepository);
        mockRepository  = module.get(MockPermissionRepository);
    });

    describe('main', () =>
    {
        test('DeletePermissionByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete permission and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new PermissionId(permissions[0].id)
            )).toBe(undefined);
        });
    });
});