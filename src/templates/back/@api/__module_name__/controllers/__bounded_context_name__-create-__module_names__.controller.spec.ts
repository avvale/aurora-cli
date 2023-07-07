// import { Test, TestingModule } from '@nestjs/testing';

// custom items
// import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller } from './{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.controller';
// import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.handler';

// sources
// import { {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.data';

{{
    setVar 'importsArray' (
        array
            (object items=(array 'Test' 'TestingModule')  path='@nestjs/testing')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Controller')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Handler')
                        (sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
    )
~}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller', () =>
{
    let controller: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller;
    let handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller,
            ],
            providers: [
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler>({{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data created', async () =>
        {
            expect(await controller.main({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data)).toBe(undefined);
        });
    });
});