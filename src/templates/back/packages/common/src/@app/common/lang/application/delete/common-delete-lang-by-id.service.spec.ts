/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';
import { CommonDeleteLangByIdService } from './common-delete-lang-by-id.service';
import { CommonLangId } from '../../domain/value-objects';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonMockLangRepository } from '../../infrastructure/mock/common-mock-lang.repository';

describe('CommonDeleteLangByIdService', () =>
{
    let service: CommonDeleteLangByIdService;
    let repository: CommonILangRepository;
    let mockRepository: CommonMockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteLangByIdService,
                CommonMockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteLangByIdService);
        repository = module.get(CommonILangRepository);
        mockRepository = module.get(CommonMockLangRepository);
    });

    describe('main', () =>
    {
        test('CommonDeleteLangByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete lang and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new CommonLangId(commonMockLangData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
