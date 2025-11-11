import {
    IamIPermissionRoleRepository,
    iamMockPermissionRoleData,
    IamMockPermissionRoleRepository,
} from '@app/iam/permission-role';
import { IamFindPermissionRoleByIdService } from '@app/iam/permission-role/application/find/iam-find-permission-role-by-id.service';
import { IamPermissionRoleId } from '@app/iam/permission-role/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionRoleByIdService', () => {
    let service: IamFindPermissionRoleByIdService;
    let repository: IamIPermissionRoleRepository;
    let mockRepository: IamMockPermissionRoleRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindPermissionRoleByIdService,
                IamMockPermissionRoleRepository,
                {
                    provide: IamIPermissionRoleRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamFindPermissionRoleByIdService);
        repository = module.get(IamIPermissionRoleRepository);
        mockRepository = module.get(IamMockPermissionRoleRepository);
    });

    describe('main', () => {
        test('FindPermissionRoleByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find permissionRole by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new IamPermissionRoleId(iamMockPermissionRoleData[0].id),
                ),
            ).toBe(mockRepository.collectionSource[0]);
        });
    });
});
