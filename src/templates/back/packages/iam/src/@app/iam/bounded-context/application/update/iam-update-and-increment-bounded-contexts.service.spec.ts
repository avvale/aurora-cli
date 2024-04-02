/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIBoundedContextRepository, iamMockBoundedContextData, IamMockBoundedContextRepository } from '@app/iam/bounded-context';
import { IamUpdateAndIncrementBoundedContextsService } from '@app/iam/bounded-context/application/update/iam-update-and-increment-bounded-contexts.service';
import {
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
} from '@app/iam/bounded-context/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementBoundedContextsService', () =>
{
    let service: IamUpdateAndIncrementBoundedContextsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateAndIncrementBoundedContextsService,
                IamMockBoundedContextRepository,
                {
                    provide : IamIBoundedContextRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateAndIncrementBoundedContextsService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementBoundedContextsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a boundedContexts and emit event', async () =>
        {
            /* eslint-disable key-spacing */
            expect(
                await service.main(
                    {
                        id: new IamBoundedContextId(iamMockBoundedContextData[0].id),
                        name: new IamBoundedContextName(iamMockBoundedContextData[0].name),
                        root: new IamBoundedContextRoot(iamMockBoundedContextData[0].root),
                        sort: new IamBoundedContextSort(iamMockBoundedContextData[0].sort),
                        isActive: new IamBoundedContextIsActive(iamMockBoundedContextData[0].isActive),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
