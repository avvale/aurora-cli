/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITagRepository, IamMockTagRepository } from '@app/iam/tag';
import { IamDeleteTagsService } from '@app/iam/tag/application/delete/iam-delete-tags.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTagsService', () =>
{
    let service: IamDeleteTagsService;
    let repository: IamITagRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamDeleteTagsService,
                IamMockTagRepository,
                {
                    provide : IamITagRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamDeleteTagsService);
        repository = module.get(IamITagRepository);
    });

    describe('main', () =>
    {
        test('IamDeleteTagsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete tag and emit event', async () =>
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
