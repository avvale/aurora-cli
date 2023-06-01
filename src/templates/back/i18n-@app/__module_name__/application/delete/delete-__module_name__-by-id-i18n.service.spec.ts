/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.data';
import { Delete{{ toPascalCase schema.moduleName }}ByIdI18nService } from './delete-{{ toKebabCase schema.moduleName }}-by-id-i18n.service';
import { {{ toPascalCase schema.moduleName }}Id } from '../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { I{{ toPascalCase schema.moduleName }}I18nRepository } from '../../domain/{{ toKebabCase schema.moduleName }}-i18n.repository';
import { Mock{{ toPascalCase schema.moduleName }}Repository } from '../../infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';

describe('Delete{{ toPascalCase schema.moduleName }}ByIdI18nService', () =>
{
    let service: Delete{{ toPascalCase schema.moduleName }}ByIdI18nService;
    let repository: I{{ toPascalCase schema.moduleName }}Repository;
    let repositoryI18n: I{{ toPascalCase schema.moduleName }}I18nRepository;
    let mockRepository: Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                Delete{{ toPascalCase schema.moduleName }}ByIdI18nService,
                Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide : I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        findById  : id => { /**/ },
                        update    : item => { /**/ },
                        deleteById: item => { /**/ },
                    },
                },
                {
                    provide : I{{ toPascalCase schema.moduleName }}I18nRepository,
                    useValue: {
                        delete: queryStatement => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(Delete{{ toPascalCase schema.moduleName }}ByIdI18nService);
        repository      = module.get(I{{ toPascalCase schema.moduleName }}Repository);
        repositoryI18n  = module.get(I{{ toPascalCase schema.moduleName }}I18nRepository);
        mockRepository  = module.get(Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('Delete{{ toPascalCase schema.moduleName }}ByIdI18nService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete {{ toCamelCase schema.moduleName }} and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new {{ toPascalCase schema.moduleName }}Id({{ toCamelCase schema.moduleNames }}[0].id)
            )).toBe(undefined);
        });
    });
});