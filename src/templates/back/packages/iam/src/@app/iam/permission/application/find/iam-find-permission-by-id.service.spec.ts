import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { iamMockPermissionData } from '@app/iam/permission/infrastructure/mock/iam-mock-permission.data';
import { IamFindPermissionByIdService } from './iam-find-permission-by-id.service';
import { IamPermissionId } from '../../domain/value-objects';
import { IamIPermissionRepository } from '../../domain/iam-permission.repository';
import { IamMockPermissionRepository } from '../../infrastructure/mock/iam-mock-permission.repository';

describe('IamFindPermissionByIdService', () =>
{
    let service: IamFindPermissionByIdService;
    let repository: IamIPermissionRepository;
    let mockRepository: IamMockPermissionRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindPermissionByIdService,
                IamMockPermissionRepository,
                {
                    provide : IamIPermissionRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamFindPermissionByIdService);
        repository = module.get(IamIPermissionRepository);
        mockRepository = module.get(IamMockPermissionRepository);
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
                new IamPermissionId(iamMockPermissionData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
