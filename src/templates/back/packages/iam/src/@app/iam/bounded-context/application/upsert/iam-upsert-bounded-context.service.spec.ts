/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamIBoundedContextRepository, iamMockBoundedContextData, IamMockBoundedContextRepository } from '@app/iam/bounded-context';
import { IamUpsertBoundedContextService } from '@app/iam/bounded-context/application/upsert/iam-upsert-bounded-context.service';
import {
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
} from '@app/iam/bounded-context/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertBoundedContextService', () =>

{
    let service: IamUpsertBoundedContextService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpsertBoundedContextService,
                IamMockBoundedContextRepository,
                {
                    provide : IamIBoundedContextRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpsertBoundedContextService);
    });

    describe('main', () =>
    {
        test('IamUpsertBoundedContextService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a boundedContext and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new IamBoundedContextId(iamMockBoundedContextData[0].id),
                        name: new IamBoundedContextName(iamMockBoundedContextData[0].name),
                        root: new IamBoundedContextRoot(iamMockBoundedContextData[0].root),
                        sort: new IamBoundedContextSort(iamMockBoundedContextData[0].sort),
                        isActive: new IamBoundedContextIsActive(iamMockBoundedContextData[0].isActive),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
