/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
{{#if (hasI18nProperties schema.aggregateProperties) }}
import { CacheModule } from '@nestjs/cache-manager';
{{/if}}

// custom items
import { {{ getClassNameAdditionalApi currentAdditionalApi }}Controller } from './{{ currentAdditionalApi.getApiFileName }}.controller';
import { {{ getClassNameAdditionalApi currentAdditionalApi }}Handler } from '../handlers/{{ currentAdditionalApi.getApiFileName }}.handler';

describe('{{ getClassNameAdditionalApi currentAdditionalApi }}Controller', () =>
{
    let controller: {{ getClassNameAdditionalApi currentAdditionalApi }}Controller;
    let handler: {{ getClassNameAdditionalApi currentAdditionalApi }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if (hasI18nProperties schema.aggregateProperties) }}
                CacheModule.register(),
                {{/if}}
            ],
            controllers: [
                {{ getClassNameAdditionalApi currentAdditionalApi }}Controller,
            ],
            providers: [
                {
                    provide : {{ getClassNameAdditionalApi currentAdditionalApi }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<{{ getClassNameAdditionalApi currentAdditionalApi }}Controller>({{ getClassNameAdditionalApi currentAdditionalApi }}Controller);
        handler = module.get<{{ getClassNameAdditionalApi currentAdditionalApi }}Handler>({{ getClassNameAdditionalApi currentAdditionalApi }}Handler);
    });

    describe('main', () =>
    {
        test('{{ getClassNameAdditionalApi currentAdditionalApi }}Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});