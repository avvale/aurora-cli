/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Test, TestingModule } from '@nestjs/testing';
// {{#if schema.properties.hasI18n}}
// import { CacheModule } from '@nestjs/cache-manager';
// {{/if}}

// custom items
// import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController } from './{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.controller';
// import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.handler';

// sources
// {{#if schema.properties.hasI18n}}
// import { langs } from '{{#eq schema.boundedContextName 'common'}}{{ config.appContainer }}/common/lang/infrastructure/mock/mock-lang.data{{else}}@aurorajs.dev/common{{/eq}}';
// {{/if}}
// import { {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/{{ toKebabCase schema.boundedContextName }}-mock-{{ toKebabCase schema.moduleName }}.data';

{{
    setVar 'importsArray' (
        array
            (object items=(array 'Testing' 'TestingModule')  path='@nestjs/testing')
            (object
                items=
                (
                    array
                    (sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'ByIdController')
                    (sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'ByIdHandler')
                    (sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(array 'CacheModule') path='@nest/cache-manager')
    (object items='commonMockLangData' path=(sumStrings config.appContainer))
    (object items='commonMockLangData' path=(sumStrings config.appContainer '/common/lang'))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
describe('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController', () =>
{
    let controller: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController;
    let handler: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            controllers: [
                {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController,
            ],
            providers: [
                {
                    provide : {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController);
        handler = module.get<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler>({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdHandler);
    });

    describe('main', () =>
    {
        test('{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an {{ toCamelCase schema.moduleName }} by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0])));
            expect(await controller.main({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0].id)).toBe({{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data[0]);
        });
    });
});