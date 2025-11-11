/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamIBoundedContextRepository,
    iamMockBoundedContextData,
    IamMockBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamUpdateBoundedContextByIdService } from '@app/iam/bounded-context/application/update/iam-update-bounded-context-by-id.service';
import {
    IamBoundedContextId,
    IamBoundedContextIsActive,
    IamBoundedContextName,
    IamBoundedContextRoot,
    IamBoundedContextRowId,
    IamBoundedContextSort,
} from '@app/iam/bounded-context/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateBoundedContextByIdService', () => {
    let service: IamUpdateBoundedContextByIdService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateBoundedContextByIdService,
                IamMockBoundedContextRepository,
                {
                    provide: IamIBoundedContextRepository,
                    useValue: {
                        updateById: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamUpdateBoundedContextByIdService);
    });

    describe('main', () => {
        test('IamUpdateBoundedContextByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should update a boundedContext and emit event', async () => {
            expect(
                await service.main(
                    {
                        id: new IamBoundedContextId(
                            iamMockBoundedContextData[0].id,
                        ),
                        rowId: new IamBoundedContextRowId(
                            iamMockBoundedContextData[0].rowId,
                        ),
                        name: new IamBoundedContextName(
                            iamMockBoundedContextData[0].name,
                        ),
                        root: new IamBoundedContextRoot(
                            iamMockBoundedContextData[0].root,
                        ),
                        sort: new IamBoundedContextSort(
                            iamMockBoundedContextData[0].sort,
                        ),
                        isActive: new IamBoundedContextIsActive(
                            iamMockBoundedContextData[0].isActive,
                        ),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
