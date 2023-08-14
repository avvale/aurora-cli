import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindUserByIdQueryHandler } from './iam-find-user-by-id.query-handler';
import { IamMockUserRepository } from '@app/iam/user/infrastructure/mock/iam-mock-user.repository';
import { iamMockUserData } from '@app/iam/user/infrastructure/mock/iam-mock-user.data';
import { IamIUserRepository } from '@app/iam/user/domain/iam-user.repository';
import { IamUserMapper } from '@app/iam/user/domain/iam-user.mapper';
import { IamFindUserByIdQuery } from './iam-find-user-by-id.query';
import { IamFindUserByIdService } from './iam-find-user-by-id.service';

describe('IamFindUserByIdQueryHandler', () =>
{
    let queryHandler: IamFindUserByIdQueryHandler;
    let service: IamFindUserByIdService;
    let repository: IamMockUserRepository;
    let mapper: IamUserMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindUserByIdQueryHandler,
                {
                    provide : IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide : IamFindUserByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamFindUserByIdQueryHandler>(IamFindUserByIdQueryHandler);
        service = module.get<IamFindUserByIdService>(IamFindUserByIdService);
        repository = <IamMockUserRepository>module.get<IamIUserRepository>(IamIUserRepository);
        mapper = new IamUserMapper();
    });

    describe('main', () =>
    {
        test('FindUserByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an user founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new IamFindUserByIdQuery(
                    iamMockUserData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
