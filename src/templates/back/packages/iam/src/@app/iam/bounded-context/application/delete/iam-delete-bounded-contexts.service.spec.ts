/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamDeleteBoundedContextsService } from './iam-delete-bounded-contexts.service';
import { IamIBoundedContextRepository } from '../../domain/iam-bounded-context.repository';
import { IamMockBoundedContextRepository } from '../../infrastructure/mock/iam-mock-bounded-context.repository';

describe('IamDeleteBoundedContextsService', () =>
{
    let service: IamDeleteBoundedContextsService;
    let repository: IamIBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteBoundedContextsService,
                IamMockBoundedContextRepository,
                {
                    provide : IamIBoundedContextRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeleteBoundedContextsService);
        repository = module.get(IamIBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('IamDeleteBoundedContextsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete boundedContext and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
