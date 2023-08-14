/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamCreateBoundedContextsService } from './iam-create-bounded-contexts.service';
import { IamIBoundedContextRepository } from '../../domain/iam-bounded-context.repository';
import { IamMockBoundedContextRepository } from '../../infrastructure/mock/iam-mock-bounded-context.repository';

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
