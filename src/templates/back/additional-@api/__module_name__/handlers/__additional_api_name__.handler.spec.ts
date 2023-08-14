/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '{{ config.auroraCorePackage }}';
{{#if (hasI18nProperties schema.aggregateProperties) }}
import { CacheModule } from '@nestjs/cache-manager';
{{/if}}

// custom items
import { {{ currentAdditionalApi.getClassName }}Handler } from './{{ currentAdditionalApi.getApiFileName }}.handler';

describe('{{ currentAdditionalApi.getClassName }}Handler', () =>
{
    let handler: {{ currentAdditionalApi.getClassName }}Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                {{#if (hasI18nProperties schema.aggregateProperties) }}
                CacheModule.register(),
                {{/if}}
            ],
            providers: [
                {{ currentAdditionalApi.getClassName }}Handler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler     = module.get<{{ currentAdditionalApi.getClassName }}Handler>({{ currentAdditionalApi.getClassName }}Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('{{ currentAdditionalApi.getClassName }}Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});