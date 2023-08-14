/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '{{ config.auroraCorePackage }}';
{{#if schema.properties.hasI18n}}
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
                {{#if schema.properties.hasI18n}}
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