import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamMockRoleRepository } from '@app/iam/role/infrastructure/mock/iam-mock-role.repository';
import { IamIRoleRepository } from '@app/iam/role/domain/iam-role.repository';
import { IamRoleMapper } from '@app/iam/role/domain/iam-role.mapper';
import { IamRawSQLRolesQueryHandler } from './iam-raw-sql-roles.query-handler';
import { IamRawSQLRolesQuery } from './iam-raw-sql-roles.query';
import { IamRawSQLRolesService } from './iam-raw-sql-roles.service';

describe('RawSQLRolesQueryHandler', () =>
{
    let queryHandler: IamRawSQLRolesQueryHandler;
    let service: IamRawSQLRolesService;
    let repository: IamMockRoleRepository;
    let mapper: IamRoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLRolesQueryHandler,
                {
                    provide : IamIRoleRepository,
                    useClass: IamMockRoleRepository,
                },
                {
                    provide : IamRawSQLRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLRolesQueryHandler>(IamRawSQLRolesQueryHandler);
        service = module.get<IamRawSQLRolesService>(IamRawSQLRolesService);
        repository = <IamMockRoleRepository>module.get<IamIRoleRepository>(IamIRoleRepository);
        mapper = new IamRoleMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLRolesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an roles founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLRolesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
