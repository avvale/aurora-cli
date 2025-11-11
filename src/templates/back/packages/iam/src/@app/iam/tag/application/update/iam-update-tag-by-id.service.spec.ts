/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamITagRepository,
    iamMockTagData,
    IamMockTagRepository,
} from '@app/iam/tag';
import { IamUpdateTagByIdService } from '@app/iam/tag/application/update/iam-update-tag-by-id.service';
import {
    IamTagId,
    IamTagName,
    IamTagRowId,
} from '@app/iam/tag/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTagByIdService', () => {
    let service: IamUpdateTagByIdService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamUpdateTagByIdService,
                IamMockTagRepository,
                {
                    provide: IamITagRepository,
                    useValue: {
                        updateById: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamUpdateTagByIdService);
    });

    describe('main', () => {
        test('IamUpdateTagByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should update a tag and emit event', async () => {
            expect(
                await service.main(
                    {
                        id: new IamTagId(iamMockTagData[0].id),
                        rowId: new IamTagRowId(iamMockTagData[0].rowId),
                        name: new IamTagName(iamMockTagData[0].name),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
