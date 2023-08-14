import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { IamPaginateRolesQueryHandler } from './iam-paginate-roles.query-handler';
import { IamMockRoleRepository } from '@app/iam/role/infrastructure/mock/iam-mock-role.repository';
import { IamIRoleRepository } from '@app/iam/role/domain/iam-role.repository';
import { IamRoleMapper } from '@app/iam/role/domain/iam-role.mapper';
import { IamPaginateRolesQuery } from './iam-paginate-roles.query';
import { IamPaginateRolesService } from './iam-paginate-roles.service';

describe('IamPaginateRolesQueryHandler', () =>
{
    let queryHandler: IamPaginateRolesQueryHandler;
    let service: IamPaginateRolesService;
    let repository: IamMockRoleRepository;
    let mapper: IamRoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamPaginateRolesQueryHandler,
                {
                    provide : IamIRoleRepository,
                    useClass: IamMockRoleRepository,
                },
                {
                    provide : IamPaginateRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamPaginateRolesQueryHandler>(IamPaginateRolesQueryHandler);
        service = module.get<IamPaginateRolesService>(IamPaginateRolesService);
        repository = <IamMockRoleRepository>module.get<IamIRoleRepository>(IamIRoleRepository);
        mapper = new IamRoleMapper();
    });

    describe('main', () =>
    {
        test('IamPaginateRolesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an roles paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new IamPaginateRolesQuery(
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
