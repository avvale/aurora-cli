import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetRolesQueryHandler } from './get-roles.query-handler';
import { MockRoleRepository } from '../../../../../@apps/iam/role/infrastructure/mock/mock-role.repository';
import { IRoleRepository } from '../../../../../@apps/iam/role/domain/role.repository';
import { RoleMapper } from '../../../../../@apps/iam/role/domain/role.mapper';
import { GetRolesQuery } from './get-roles.query';
import { GetRolesService } from './get-roles.service';

describe('GetRolesQueryHandler', () =>
{
    let queryHandler: GetRolesQueryHandler;
    let service: GetRolesService;
    let repository: MockRoleRepository;
    let mapper: RoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetRolesQueryHandler,
                {
                    provide : IRoleRepository,
                    useClass: MockRoleRepository
                },
                {
                    provide : GetRolesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetRolesQueryHandler>(GetRolesQueryHandler);
        service         = module.get<GetRolesService>(GetRolesService);
        repository      = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);
        mapper          = new RoleMapper();
    });

    describe('main', () =>
    {
        test('GetRolesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an roles founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetRolesQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});