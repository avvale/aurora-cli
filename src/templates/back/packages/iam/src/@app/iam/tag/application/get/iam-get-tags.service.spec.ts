import { IamITagRepository, IamMockTagRepository } from '@app/iam/tag';
import { IamGetTagsService } from '@app/iam/tag/application/get/iam-get-tags.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTagsService', () => {
    let service: IamGetTagsService;
    let repository: IamITagRepository;
    let mockRepository: IamMockTagRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamGetTagsService,
                IamMockTagRepository,
                {
                    provide: IamITagRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamGetTagsService);
        repository = module.get(IamITagRepository);
        mockRepository = module.get(IamMockTagRepository);
    });

    describe('main', () => {
        test('GetTagsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should get tags', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource),
                    ),
            );
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
