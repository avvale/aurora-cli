/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { {{ currentAdditionalApi.getClassName }}Resolver } from './{{ currentAdditionalApi.getApiFileName }}.resolver';
import { {{ currentAdditionalApi.getClassName }}Handler } from '../handlers/{{ currentAdditionalApi.getApiFileName }}.handler';

describe('{{ currentAdditionalApi.getClassName }}Resolver', () =>
{
    let resolver: {{ currentAdditionalApi.getClassName }}Resolver;
    let handler: {{ currentAdditionalApi.getClassName }}Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if schema.properties.hasI18n}}
                CacheModule.register(),
                {{/if}}
            ],
            providers: [
                {{ currentAdditionalApi.getClassName }}Resolver,
                {
                    provide : {{ currentAdditionalApi.getClassName }}Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<{{ currentAdditionalApi.getClassName }}Resolver>({{ currentAdditionalApi.getClassName }}Resolver);
        handler = module.get<{{ currentAdditionalApi.getClassName }}Handler>({{ currentAdditionalApi.getClassName }}Handler);
    });

    test('{{ currentAdditionalApi.getClassName }}Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('{{ currentAdditionalApi.getClassName }}Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});