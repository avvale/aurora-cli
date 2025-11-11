import {
    IamGetTagsQuery,
    IamITagRepository,
    IamMockTagRepository,
    IamTagMapper,
} from '@app/iam/tag';
import { IamGetTagsQueryHandler } from '@app/iam/tag/application/get/iam-get-tags.query-handler';
import { IamGetTagsService } from '@app/iam/tag/application/get/iam-get-tags.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetTagsQueryHandler', () => {
    let queryHandler: IamGetTagsQueryHandler;
    let service: IamGetTagsService;
    let repository: IamMockTagRepository;
    let mapper: IamTagMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetTagsQueryHandler,
                {
                    provide: IamITagRepository,
                    useClass: IamMockTagRepository,
                },
                {
                    provide: IamGetTagsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<IamGetTagsQueryHandler>(
            IamGetTagsQueryHandler,
        );
        service = module.get<IamGetTagsService>(IamGetTagsService);
        repository = <IamMockTagRepository>(
            module.get<IamITagRepository>(IamITagRepository)
        );
        mapper = new IamTagMapper();
    });

    describe('main', () => {
        test('IamGetTagsQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tags founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource),
                    ),
            );
            expect(
                await queryHandler.execute(new IamGetTagsQuery()),
            ).toStrictEqual(
                mapper.mapAggregatesToResponses(repository.collectionSource),
            );
        });
    });
});
