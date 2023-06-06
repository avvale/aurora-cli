/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
{{#if schema.properties.hasI18n}}
import { CacheModule } from '@nestjs/cache-manager';
{{/if}}

// custom items
import { {{ currentAdditionalApi.getClassName }}Controller } from './{{ currentAdditionalApi.getApiFileName }}.controller';
import { {{ currentAdditionalApi.getClassName }}Handler } from '../handlers/{{ currentAdditionalApi.getApiFileName }}.handler';

describe('{{ currentAdditionalApi.getClassName }}Controller', () =>
{
    let controller: {{ currentAdditionalApi.getClassName }}Controller;
    let handler: {{ currentAdditionalApi.getClassName }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            controllers: [
                {{ currentAdditionalApi.getClassName }}Controller,
            ],
            providers: [
                {
                    provide : {{ currentAdditionalApi.getClassName }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<{{ currentAdditionalApi.getClassName }}Controller>({{ currentAdditionalApi.getClassName }}Controller);
        handler = module.get<{{ currentAdditionalApi.getClassName }}Handler>({{ currentAdditionalApi.getClassName }}Handler);
    });

    describe('main', () =>
    {
        test('{{ currentAdditionalApi.getClassName }}Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });
    });
});