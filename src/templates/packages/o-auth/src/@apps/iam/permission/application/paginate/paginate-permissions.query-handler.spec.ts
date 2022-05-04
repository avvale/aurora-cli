import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from 'aurora-ts-core';

// custom items
import { PaginatePermissionsQueryHandler } from './paginate-permissions.query-handler';
import { MockPermissionRepository } from '../../../../../@apps/iam/permission/infrastructure/mock/mock-permission.repository';
import { IPermissionRepository } from '../../../../../@apps/iam/permission/domain/permission.repository';
import { PermissionMapper } from '../../../../../@apps/iam/permission/domain/permission.mapper';
import { PaginatePermissionsQuery } from './paginate-permissions.query';
import { PaginatePermissionsService } from './paginate-permissions.service';

describe('PaginatePermissionsQueryHandler', () =>
{
    let queryHandler: PaginatePermissionsQueryHandler;
    let service: PaginatePermissionsService;
    let repository: MockPermissionRepository;
    let mapper: PermissionMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginatePermissionsQueryHandler,
                {
                    provide : IPermissionRepository,
                    useClass: MockPermissionRepository
                },
                {
                    provide : PaginatePermissionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginatePermissionsQueryHandler>(PaginatePermissionsQueryHandler);
        service         = module.get<PaginatePermissionsService>(PaginatePermissionsService);
        repository      = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);
        mapper          = new PermissionMapper();
    });

    describe('main', () =>
    {
        test('PaginatePermissionsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissions paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginatePermissionsQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});