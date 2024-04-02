/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamITagRepository, iamMockTagData, IamMockTagRepository } from '@app/iam/tag';
import { IamCreateTagService } from '@app/iam/tag/application/create/iam-create-tag.service';
import {
    IamTagId,
    IamTagName,
} from '@app/iam/tag/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTagService', () =>

{
    let service: IamCreateTagService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCreateTagService,
                IamMockTagRepository,
                {
                    provide : IamITagRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCreateTagService);
    });

    describe('main', () =>
    {
        test('IamCreateTagService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a tag and emit event', async () =>
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
