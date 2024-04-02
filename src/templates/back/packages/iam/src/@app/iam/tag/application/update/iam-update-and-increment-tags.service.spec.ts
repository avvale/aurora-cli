/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITagRepository, iamMockTagData, IamMockTagRepository } from '@app/iam/tag';
import { IamUpdateAndIncrementTagsService } from '@app/iam/tag/application/update/iam-update-and-increment-tags.service';
import {
    IamTagId,
    IamTagName,
} from '@app/iam/tag/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAndIncrementTagsService', () =>
{
    let service: IamUpdateAndIncrementTagsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateAndIncrementTagsService,
                IamMockTagRepository,
                {
                    provide : IamITagRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpdateAndIncrementTagsService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementTagsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a tags and emit event', async () =>
        {
            /* eslint-disable key-spacing */
            expect(
                await service.main(
                    {
                        id: new IamTagId(iamMockTagData[0].id),
                        name: new IamTagName(iamMockTagData[0].name),
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
