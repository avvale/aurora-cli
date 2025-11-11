import {
    IamIBoundedContextRepository,
    iamMockBoundedContextData,
    IamMockBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamFindBoundedContextByIdService } from '@app/iam/bounded-context/application/find/iam-find-bounded-context-by-id.service';
import { IamBoundedContextId } from '@app/iam/bounded-context/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindBoundedContextByIdService', () => {
    let service: IamFindBoundedContextByIdService;
    let repository: IamIBoundedContextRepository;
    let mockRepository: IamMockBoundedContextRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindBoundedContextByIdService,
                IamMockBoundedContextRepository,
                {
                    provide: IamIBoundedContextRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamFindBoundedContextByIdService);
        repository = module.get(IamIBoundedContextRepository);
        mockRepository = module.get(IamMockBoundedContextRepository);
    });

    describe('main', () => {
        test('FindBoundedContextByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find boundedContext by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new IamBoundedContextId(iamMockBoundedContextData[0].id),
                ),
            ).toBe(mockRepository.collectionSource[0]);
        });
    });
});
