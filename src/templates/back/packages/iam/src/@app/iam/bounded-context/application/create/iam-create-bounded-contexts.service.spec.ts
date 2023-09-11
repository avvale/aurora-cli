/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIBoundedContextRepository, IamMockBoundedContextRepository } from '@app/iam/bounded-context';
import { IamCreateBoundedContextsService } from '@app/iam/bounded-context/application/create/iam-create-bounded-contexts.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateBoundedContextsService', () =>
{
    let service: IamCreateBoundedContextsService;
    let mockRepository: IamMockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateBoundedContextsService,
                IamMockBoundedContextRepository,
                {
                    provide : IamIBoundedContextRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCreateBoundedContextsService);
        mockRepository = module.get(IamMockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('CreateBoundedContextsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create boundedContexts and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
