/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITagRepository, iamMockTagData, IamMockTagRepository } from '@app/iam/tag';
import { IamUpsertTagService } from '@app/iam/tag/application/upsert/iam-upsert-tag.service';
import {
    IamTagId,
    IamTagName,
} from '@app/iam/tag/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTagService', () =>

{
    let service: IamUpsertTagService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpsertTagService,
                IamMockTagRepository,
                {
                    provide : IamITagRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamUpsertTagService);
    });

    describe('main', () =>
    {
        test('IamUpsertTagService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a tag and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new IamTagId(iamMockTagData[0].id),
                        name: new IamTagName(iamMockTagData[0].name),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
