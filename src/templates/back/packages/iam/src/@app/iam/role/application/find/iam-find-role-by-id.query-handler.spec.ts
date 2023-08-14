import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindRoleByIdQueryHandler } from './iam-find-role-by-id.query-handler';
import { IamMockRoleRepository } from '@app/iam/role/infrastructure/mock/iam-mock-role.repository';
import { iamMockRoleData } from '@app/iam/role/infrastructure/mock/iam-mock-role.data';
import { IamIRoleRepository } from '@app/iam/role/domain/iam-role.repository';
import { IamRoleMapper } from '@app/iam/role/domain/iam-role.mapper';
import { IamFindRoleByIdQuery } from './iam-find-role-by-id.query';
import { IamFindRoleByIdService } from './iam-find-role-by-id.service';

describe('IamFindRoleByIdQueryHandler', () =>
{
    let queryHandler: IamFindRoleByIdQueryHandler;
    let service: IamFindRoleByIdService;
    let repository: IamMockRoleRepository;
    let mapper: IamRoleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindRoleByIdQueryHandler,
                {
                    provide : IamIRoleRepository,
                    useClass: IamMockRoleRepository,
                },
                {
                    provide : IamFindRoleByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamFindRoleByIdQueryHandler>(IamFindRoleByIdQueryHandler);
        service = module.get<IamFindRoleByIdService>(IamFindRoleByIdService);
        repository = <IamMockRoleRepository>module.get<IamIRoleRepository>(IamIRoleRepository);
        mapper = new IamRoleMapper();
    });

    describe('main', () =>
    {
        test('FindRoleByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an role founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new IamFindRoleByIdQuery(
                    iamMockRoleData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
