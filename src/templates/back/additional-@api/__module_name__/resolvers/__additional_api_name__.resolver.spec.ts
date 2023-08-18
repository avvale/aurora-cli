/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
{{#if (hasI18nProperties schema.aggregateProperties) }}
import { CacheModule } from '@nestjs/cache-manager';
{{/if}}


// custom items
import { {{ getClassNameAdditionalApi currentAdditionalApi }}Resolver } from './{{ currentAdditionalApi.getApiFileName }}.resolver';
import { {{ getClassNameAdditionalApi currentAdditionalApi }}Handler } from '../handlers/{{ currentAdditionalApi.getApiFileName }}.handler';

describe('{{ getClassNameAdditionalApi currentAdditionalApi }}Resolver', () =>
{
    let resolver: {{ getClassNameAdditionalApi currentAdditionalApi }}Resolver;
    let handler: {{ getClassNameAdditionalApi currentAdditionalApi }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if (hasI18nProperties schema.aggregateProperties) }}
                CacheModule.register(),
                {{/if}}
            ],
            providers: [
                {{ getClassNameAdditionalApi currentAdditionalApi }}Resolver,
                {
                    provide : {{ getClassNameAdditionalApi currentAdditionalApi }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<{{ getClassNameAdditionalApi currentAdditionalApi }}Resolver>({{ getClassNameAdditionalApi currentAdditionalApi }}Resolver);
        handler = module.get<{{ getClassNameAdditionalApi currentAdditionalApi }}Handler>({{ getClassNameAdditionalApi currentAdditionalApi }}Handler);
    });

    test('{{ getClassNameAdditionalApi currentAdditionalApi }}Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ getClassNameAdditionalApi currentAdditionalApi }}Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});