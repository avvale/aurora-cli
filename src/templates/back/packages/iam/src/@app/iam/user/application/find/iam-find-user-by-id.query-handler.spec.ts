import {
    IamFindUserByIdQuery,
    IamIUserRepository,
    iamMockUserData,
    IamMockUserRepository,
    IamUserMapper,
} from '@app/iam/user';
import { IamFindUserByIdQueryHandler } from '@app/iam/user/application/find/iam-find-user-by-id.query-handler';
import { IamFindUserByIdService } from '@app/iam/user/application/find/iam-find-user-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindUserByIdQueryHandler', () => {
    let queryHandler: IamFindUserByIdQueryHandler;
    let service: IamFindUserByIdService;
    let repository: IamMockUserRepository;
    let mapper: IamUserMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindUserByIdQueryHandler,
                {
                    provide: IamIUserRepository,
                    useClass: IamMockUserRepository,
                },
                {
                    provide: IamFindUserByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamFindUserByIdQueryHandler>(
            IamFindUserByIdQueryHandler,
        );
        service = module.get<IamFindUserByIdService>(IamFindUserByIdService);
        repository = <IamMockUserRepository>(
            module.get<IamIUserRepository>(IamIUserRepository)
        );
        mapper = new IamUserMapper();
    });

    describe('main', () => {
        test('FindUserByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an user founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new IamFindUserByIdQuery(iamMockUserData[0].id),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
