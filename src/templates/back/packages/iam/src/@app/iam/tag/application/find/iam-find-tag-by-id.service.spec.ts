import {
    IamITagRepository,
    iamMockTagData,
    IamMockTagRepository,
} from '@app/iam/tag';
import { IamFindTagByIdService } from '@app/iam/tag/application/find/iam-find-tag-by-id.service';
import { IamTagId } from '@app/iam/tag/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTagByIdService', () => {
    let service: IamFindTagByIdService;
    let repository: IamITagRepository;
    let mockRepository: IamMockTagRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindTagByIdService,
                IamMockTagRepository,
                {
                    provide: IamITagRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamFindTagByIdService);
        repository = module.get(IamITagRepository);
        mockRepository = module.get(IamMockTagRepository);
    });

    describe('main', () => {
        test('FindTagByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find tag by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(await service.main(new IamTagId(iamMockTagData[0].id))).toBe(
                mockRepository.collectionSource[0],
            );
        });
    });
});
