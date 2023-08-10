import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { IamPaginatePermissionsQueryHandler } from './iam-paginate-permissions.query-handler';
import { IamMockPermissionRepository } from '@app/iam/permission/infrastructure/mock/iam-mock-permission.repository';
import { IamIPermissionRepository } from '@app/iam/permission/domain/iam-permission.repository';
import { IamPermissionMapper } from '@app/iam/permission/domain/iam-permission.mapper';
import { IamPaginatePermissionsQuery } from './iam-paginate-permissions.query';
import { IamPaginatePermissionsService } from './iam-paginate-permissions.service';

describe('IamPaginatePermissionsQueryHandler', () =>
{
    let queryHandler: IamPaginatePermissionsQueryHandler;
    let service: IamPaginatePermissionsService;
    let repository: IamMockPermissionRepository;
    let mapper: IamPermissionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamPaginatePermissionsQueryHandler,
                {
                    provide : IamIPermissionRepository,
                    useClass: IamMockPermissionRepository,
                },
                {
                    provide : IamPaginatePermissionsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamPaginatePermissionsQueryHandler>(IamPaginatePermissionsQueryHandler);
        service = module.get<IamPaginatePermissionsService>(IamPaginatePermissionsService);
        repository = <IamMockPermissionRepository>module.get<IamIPermissionRepository>(IamIPermissionRepository);
        mapper = new IamPermissionMapper();
    });

    describe('main', () =>
    {
        test('IamPaginatePermissionsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissions paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new IamPaginatePermissionsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
