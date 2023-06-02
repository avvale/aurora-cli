/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { DeleteLangByIdService } from './delete-lang-by-id.service';
import { LangId } from '../../domain/value-objects';
import { ILangRepository } from '../../domain/lang.repository';
import { MockLangRepository } from '../../infrastructure/mock/mock-lang.repository';

describe('DeleteLangByIdService', () =>
{
    let service: DeleteLangByIdService;
    let repository: ILangRepository;
    let mockRepository: MockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteLangByIdService,
                MockLangRepository,
                {
                    provide : ILangRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteLangByIdService);
        repository = module.get(ILangRepository);
        mockRepository = module.get(MockLangRepository);
    });

    describe('main', () =>
    {
        test('DeleteLangByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete lang and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new LangId(langs[0].id),
            )).toBe(undefined);
        });
    });
});