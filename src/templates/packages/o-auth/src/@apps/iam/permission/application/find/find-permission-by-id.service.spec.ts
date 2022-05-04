import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { permissions } from '../../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';
import { FindPermissionByIdService } from './find-permission-by-id.service';
import { PermissionId } from '../../domain/value-objects';
import { IPermissionRepository } from '../../domain/permission.repository';
import { MockPermissionRepository } from '../../infrastructure/mock/mock-permission.repository';

describe('FindPermissionByIdService', () =>
{
    let service: FindPermissionByIdService;
    let repository: IPermissionRepository;
    let mockRepository: MockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindPermissionByIdService,
                MockPermissionRepository,
                {
                    provide: IPermissionRepository,
                    useValue: {
                        findById: id => { /**/ }
                    }
                }
            ]
        }).compile();

        service         = module.get(FindPermissionByIdService);
        repository      = module.get(IPermissionRepository);
        mockRepository  = module.get(MockPermissionRepository);
    });

    describe('main', () =>
    {
        test('FindPermissionByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find permission by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new PermissionId(permissions[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});