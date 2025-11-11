import {
    IamIPermissionRoleRepository,
    IamMockPermissionRoleRepository,
    IamPaginatePermissionsRolesQuery,
} from '@app/iam/permission-role';
import { IamPaginatePermissionsRolesQueryHandler } from '@app/iam/permission-role/application/paginate/iam-paginate-permissions-roles.query-handler';
import { IamPaginatePermissionsRolesService } from '@app/iam/permission-role/application/paginate/iam-paginate-permissions-roles.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginatePermissionsRolesQueryHandler', () => {
    let queryHandler: IamPaginatePermissionsRolesQueryHandler;
    let service: IamPaginatePermissionsRolesService;
    let repository: IamMockPermissionRoleRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamPaginatePermissionsRolesQueryHandler,
                {
                    provide: IamIPermissionRoleRepository,
                    useClass: IamMockPermissionRoleRepository,
                },
                {
                    provide: IamPaginatePermissionsRolesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamPaginatePermissionsRolesQueryHandler>(
            IamPaginatePermissionsRolesQueryHandler,
        );
        service = module.get<IamPaginatePermissionsRolesService>(
            IamPaginatePermissionsRolesService,
        );
        repository = <IamMockPermissionRoleRepository>(
            module.get<IamIPermissionRoleRepository>(
                IamIPermissionRoleRepository,
            )
        );
    });

    describe('main', () => {
        test('IamPaginatePermissionsRolesQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissionsRoles paginated', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            count: 10,
                            total: 100,
                            rows: repository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new IamPaginatePermissionsRolesQuery({
                        offset: 0,
                        limit: 10,
                    }),
                ),
            ).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource
                        .slice(0, 10)
                        .map((item) => item.toDTO()),
                ),
            );
        });
    });
});
