import { IamIPermissionRepository, IamMockPermissionRepository, IamPaginatePermissionsQuery } from '@app/iam/permission';
import { IamPaginatePermissionsQueryHandler } from '@app/iam/permission/application/paginate/iam-paginate-permissions.query-handler';
import { IamPaginatePermissionsService } from '@app/iam/permission/application/paginate/iam-paginate-permissions.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginatePermissionsQueryHandler', () =>
{
    let queryHandler: IamPaginatePermissionsQueryHandler;
    let service: IamPaginatePermissionsService;
    let repository: IamMockPermissionRepository;

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
