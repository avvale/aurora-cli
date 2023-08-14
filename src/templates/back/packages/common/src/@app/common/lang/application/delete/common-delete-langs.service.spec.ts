/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonDeleteLangsService } from './common-delete-langs.service';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonMockLangRepository } from '../../infrastructure/mock/common-mock-lang.repository';

describe('CommonDeleteLangsService', () =>
{
    let service: CommonDeleteLangsService;
    let repository: CommonILangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteLangsService,
                CommonMockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteLangsService);
        repository = module.get(CommonILangRepository);
    });

    describe('main', () =>
    {
        test('CommonDeleteLangsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete lang and emit event', async () =>
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
