/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIBoundedContextRepository,
    iamMockBoundedContextData,
    IamMockBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamDeleteBoundedContextByIdService } from '@app/iam/bounded-context/application/delete/iam-delete-bounded-context-by-id.service';
import { IamBoundedContextId } from '@app/iam/bounded-context/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteBoundedContextByIdService', () => {
    let service: IamDeleteBoundedContextByIdService;
    let repository: IamIBoundedContextRepository;
    let mockRepository: IamMockBoundedContextRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteBoundedContextByIdService,
                IamMockBoundedContextRepository,
                {
                    provide: IamIBoundedContextRepository,
                    useValue: {
                        deleteById: (id) => {
                            /**/
                        },
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamDeleteBoundedContextByIdService);
        repository = module.get(IamIBoundedContextRepository);
        mockRepository = module.get(IamMockBoundedContextRepository);
    });

    describe('main', () => {
        test('IamDeleteBoundedContextByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete boundedContext and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new IamBoundedContextId(iamMockBoundedContextData[0].id),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
