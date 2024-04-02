/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITagRepository, iamMockTagData, IamMockTagRepository } from '@app/iam/tag';
import { IamUpdateTagsService } from '@app/iam/tag/application/update/iam-update-tags.service';
import {
    IamTagId,
    IamTagName,
} from '@app/iam/tag/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTagsService', () =>
{
    let service: IamUpdateTagsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateTagsService,
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

        service = module.get(IamUpdateTagsService);
    });

    describe('main', () =>
    {
        test('UpdateTagsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a tags and emit event', async () =>
        {
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
        });
    });
});
