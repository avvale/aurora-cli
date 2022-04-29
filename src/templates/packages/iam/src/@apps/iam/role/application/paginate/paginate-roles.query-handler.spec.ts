import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from 'aurora-ts-core';

// custom items
import { PaginateRolesQueryHandler } from './paginate-roles.query-handler';
import { MockRoleRepository } from '../../../../../@apps/iam/role/infrastructure/mock/mock-role.repository';
import { IRoleRepository } from '../../../../../@apps/iam/role/domain/role.repository';
import { RoleMapper } from '../../../../../@apps/iam/role/domain/role.mapper';
import { PaginateRolesQuery } from './paginate-roles.query';
import { PaginateRolesService } from './paginate-roles.service';

describe('PaginateRolesQueryHandler', () =>
{
    let queryHandler: PaginateRolesQueryHandler;
    let service: PaginateRolesService;
    let repository: MockRoleRepository;
    let mapper: RoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateRolesQueryHandler,
                {
                    provide : IRoleRepository,
                    useClass: MockRoleRepository
                },
                {
                    provide : PaginateRolesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateRolesQueryHandler>(PaginateRolesQueryHandler);
        service         = module.get<PaginateRolesService>(PaginateRolesService);
        repository      = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);
        mapper          = new RoleMapper();
    });

    describe('main', () =>
    {
        test('PaginateRolesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an roles paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateRolesQuery(
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