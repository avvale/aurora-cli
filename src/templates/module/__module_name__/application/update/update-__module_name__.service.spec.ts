import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.applicationsContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/seeds/{{ toKebabCase schema.moduleName }}.seed';
import { Update{{ toPascalCase schema.moduleName }}Service } from './update-{{ toKebabCase schema.moduleName }}.service';
import {
    {{> importValueObjects }}
} from './../../domain/value-objects';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { Mock{{ toPascalCase schema.moduleName }}Repository } from './../../infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.repository';

describe('Update{{ toPascalCase schema.moduleName }}Service', () =>
{
    let service: Update{{ toPascalCase schema.moduleName }}Service;
    let repository: I{{ toPascalCase schema.moduleName }}Repository;
    let mockRepository: Mock{{ toPascalCase schema.moduleName }}Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                Update{{ toPascalCase schema.moduleName }}Service,
                Mock{{ toPascalCase schema.moduleName }}Repository,
                {
                    provide: I{{ toPascalCase schema.moduleName }}Repository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(Update{{ toPascalCase schema.moduleName }}Service);
        repository      = module.get(I{{ toPascalCase schema.moduleName }}Repository);
        mockRepository  = module.get(Mock{{ toPascalCase schema.moduleName }}Repository);
    });

    describe('main', () =>
    {
        test('Update{{ toPascalCase schema.moduleName }}Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a {{ toCamelCase schema.moduleName }} and emit event', async () =>
        {
            expect(await service.main(
                {
                    {{#each schema.properties.updateService}}
                    {{ toCamelCase name }}: new {{ toPascalCase ../schema.moduleName }}{{ toPascalCase name }}({{ toCamelCase ../schema.moduleNames }}[0].{{ toCamelCase name }}),
                    {{/each}}
                }
            )).toBe(undefined);
        });
    });
});