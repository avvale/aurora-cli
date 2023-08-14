/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';
import { CommonUpdateLangByIdService } from './common-update-lang-by-id.service';
import {
    CommonLangId,
    CommonLangName,
    CommonLangImage,
    CommonLangIso6392,
    CommonLangIso6393,
    CommonLangIetf,
    CommonLangCustomCode,
    CommonLangDir,
    CommonLangSort,
    CommonLangIsActive,
    CommonLangCreatedAt,
    CommonLangUpdatedAt,
    CommonLangDeletedAt,
} from '../../domain/value-objects';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonMockLangRepository } from '../../infrastructure/mock/common-mock-lang.repository';

describe('CommonUpdateLangByIdService', () =>
{
    let service: CommonUpdateLangByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpdateLangByIdService,
                CommonMockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpdateLangByIdService);
    });

    describe('main', () =>
    {
        test('CommonUpdateLangByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a lang and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new CommonLangId(commonMockLangData[0].id),
                        name: new CommonLangName(commonMockLangData[0].name),
                        image: new CommonLangImage(commonMockLangData[0].image),
                        iso6392: new CommonLangIso6392(commonMockLangData[0].iso6392),
                        iso6393: new CommonLangIso6393(commonMockLangData[0].iso6393),
                        ietf: new CommonLangIetf(commonMockLangData[0].ietf),
                        customCode: new CommonLangCustomCode(commonMockLangData[0].customCode),
                        dir: new CommonLangDir(commonMockLangData[0].dir),
                        sort: new CommonLangSort(commonMockLangData[0].sort),
                        isActive: new CommonLangIsActive(commonMockLangData[0].isActive),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
