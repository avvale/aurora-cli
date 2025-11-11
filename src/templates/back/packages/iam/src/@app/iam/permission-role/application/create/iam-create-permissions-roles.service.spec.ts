/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIPermissionRoleRepository,
    IamMockPermissionRoleRepository,
} from '@app/iam/permission-role';
import { IamCreatePermissionsRolesService } from '@app/iam/permission-role/application/create/iam-create-permissions-roles.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionsRolesService', () => {
    let service: IamCreatePermissionsRolesService;
    let mockRepository: IamMockPermissionRoleRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreatePermissionsRolesService,
                IamMockPermissionRoleRepository,
                {
                    provide: IamIPermissionRoleRepository,
                    useValue: {
                        insert: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamCreatePermissionsRolesService);
        mockRepository = module.get(IamMockPermissionRoleRepository);
    });

    describe('main', () => {
        test('CreatePermissionsRolesService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create permissionsRoles and emit event', async () => {
            expect(await service.main(mockRepository.collectionSource)).toBe(
                undefined,
            );
        });
    });
});
