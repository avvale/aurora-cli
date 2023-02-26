import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockRoleRepository } from '@app/iam/role/infrastructure/mock/mock-role.repository';
import { IRoleRepository } from '@app/iam/role/domain/role.repository';
import { RoleMapper } from '@app/iam/role/domain/role.mapper';
import { RawSQLRolesQueryHandler } from './raw-sql-roles.query-handler';
import { RawSQLRolesQuery } from './raw-sql-roles.query';
import { RawSQLRolesService } from './raw-sql-roles.service';

describe('RawSQLRolesQueryHandler', () =>
{
    let queryHandler: RawSQLRolesQueryHandler;
    let service: RawSQLRolesService;
    let repository: MockRoleRepository;
    let mapper: RoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLRolesQueryHandler,
                {
                    provide : IRoleRepository,
                    useClass: MockRoleRepository,
                },
                {
                    provide : RawSQLRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLRolesQueryHandler>(RawSQLRolesQueryHandler);
        service         = module.get<RawSQLRolesService>(RawSQLRolesService);
        repository      = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);
        mapper          = new RoleMapper();
    });

    describe('main', () =>
    {
        test('RawSQLRolesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an roles founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLRolesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});