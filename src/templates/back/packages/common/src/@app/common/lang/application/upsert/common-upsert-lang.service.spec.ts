/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonILangRepository, commonMockLangData, CommonMockLangRepository } from '@app/common/lang';
import { CommonUpsertLangService } from '@app/common/lang/application/upsert/common-upsert-lang.service';
import {
    CommonLangCustomCode,
    CommonLangDir,
    CommonLangId,
    CommonLangIetf,
    CommonLangImage,
    CommonLangIsActive,
    CommonLangIso6392,
    CommonLangIso6393,
    CommonLangName,
    CommonLangSort,
} from '@app/common/lang/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertLangService', () =>

{
    let service: CommonUpsertLangService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpsertLangService,
                CommonMockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpsertLangService);
    });

    describe('main', () =>
    {
        test('CommonUpsertLangService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a lang and emit event', async () =>
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
                ),
            )
                .toBe(undefined);
        });
    });
});
