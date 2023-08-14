import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetRolesQueryHandler } from './iam-get-roles.query-handler';
import { IamMockRoleRepository } from '@app/iam/role/infrastructure/mock/iam-mock-role.repository';
import { IamIRoleRepository } from '@app/iam/role/domain/iam-role.repository';
import { IamRoleMapper } from '@app/iam/role/domain/iam-role.mapper';
import { IamGetRolesQuery } from './iam-get-roles.query';
import { IamGetRolesService } from './iam-get-roles.service';

describe('GetRolesQueryHandler', () =>
{
    let queryHandler: IamGetRolesQueryHandler;
    let service: IamGetRolesService;
    let repository: IamMockRoleRepository;
    let mapper: IamRoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetRolesQueryHandler,
                {
                    provide : IamIRoleRepository,
                    useClass: IamMockRoleRepository,
                },
                {
                    provide : IamGetRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamGetRolesQueryHandler>(IamGetRolesQueryHandler);
        service = module.get<IamGetRolesService>(IamGetRolesService);
        repository = <IamMockRoleRepository>module.get<IamIRoleRepository>(IamIRoleRepository);
        mapper = new IamRoleMapper();
    });

    describe('main', () =>
    {
        test('IamGetRolesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an roles founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamGetRolesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});