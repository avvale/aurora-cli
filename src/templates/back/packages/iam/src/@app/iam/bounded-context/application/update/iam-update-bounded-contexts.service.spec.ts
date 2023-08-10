/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { iamMockBoundedContextData } from '@app/iam/bounded-context/infrastructure/mock/iam-mock-bounded-context.data';
import { IamUpdateBoundedContextsService } from './iam-update-bounded-contexts.service';
import {
    IamBoundedContextId,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextSort,
    IamBoundedContextIsActive,
    IamBoundedContextCreatedAt,
    IamBoundedContextUpdatedAt,
    IamBoundedContextDeletedAt,
} from '../../domain/value-objects';
import { IamIBoundedContextRepository } from '../../domain/iam-bounded-context.repository';
import { IamMockBoundedContextRepository } from '../../infrastructure/mock/iam-mock-bounded-context.repository';

describe('IamUpdateBoundedContextsService', () =>
{
    let service: IamUpdateBoundedContextsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateBoundedContextsService,
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

        service = module.get(IamUpdateBoundedContextsService);
    });

    describe('main', () =>
    {
        test('UpdateBoundedContextsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a boundedContexts and emit event', async () =>
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
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
