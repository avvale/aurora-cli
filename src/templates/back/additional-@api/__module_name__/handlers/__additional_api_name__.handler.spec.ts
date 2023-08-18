/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '{{ config.auroraCorePackage }}';
{{#if (hasI18nProperties schema.aggregateProperties) }}
import { CacheModule } from '@nestjs/cache-manager';
{{/if}}

// custom items
import { {{ getClassNameAdditionalApi currentAdditionalApi }}Handler } from './{{ currentAdditionalApi.getApiFileName }}.handler';

describe('{{ getClassNameAdditionalApi currentAdditionalApi }}Handler', () =>
{
    let handler: {{ getClassNameAdditionalApi currentAdditionalApi }}Handler;
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
                {{ getClassNameAdditionalApi currentAdditionalApi }}Handler,
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

        handler     = module.get<{{ getClassNameAdditionalApi currentAdditionalApi }}Handler>({{ getClassNameAdditionalApi currentAdditionalApi }}Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('{{ getClassNameAdditionalApi currentAdditionalApi }}Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});