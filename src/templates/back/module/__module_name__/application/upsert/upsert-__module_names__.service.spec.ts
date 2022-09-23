/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
{{#if schema.properties.hasI18n}}
import { ConfigService } from '@nestjs/config';
{{/if}}

// custom items
import { Upsert{{ toPascalCase schema.moduleNames }}Service } from './upsert-{{ toKebabCase schema.moduleNames }}.service';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
{{#if schema.properties.hasI18n}}
import { I{{ toPascalCase schema.moduleName }}I18NRepository } from '../../domain/{{ toKebabCase schema.moduleName }}-i18n.repository';
{{/if}}
import { Mock{{ toPascalCase schema.moduleName }}Repository } from '../../infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';

describe('Upsert{{ toPascalCase schema.moduleNames }}Service', () =>
{
    let service: Upsert{{ toPascalCase schema.moduleNames }}Service;
    let repository: I{{ toPascalCase schema.moduleName }}Repository;
    {{#if schema.properties.hasI18n}}
    let repositoryI18N: I{{ toPascalCase schema.moduleName }}I18NRepository;
    {{/if}}
    let mockRepository: Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                Upsert{{ toPascalCase schema.moduleNames }}Service,
                Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide : I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
                {{#if schema.properties.hasI18n}}
                {
                    provide : I{{ toPascalCase schema.moduleName }}I18NRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_LANG' ? 'es' : ''
                    },
                },
                {{/if}}
            ],
        })
            .compile();

        service         = module.get(Upsert{{ toPascalCase schema.moduleNames }}Service);
        repository      = module.get(I{{ toPascalCase schema.moduleName }}Repository);
        mockRepository  = module.get(Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('Upsert{{ toPascalCase schema.moduleNames }}Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert {{ toCamelCase schema.moduleNames }} and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource,
            )).toBe(undefined);
        });
    });
});