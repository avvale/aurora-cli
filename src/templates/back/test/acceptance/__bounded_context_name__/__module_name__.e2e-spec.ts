/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'INestApplication') path='@nestjs/common')
            (object items=(array 'Test' 'TestingModule') path='@nestjs/testing')
            (object items=(array 'ConfigModule' 'ConfigService') path='@nestjs/config')
            (object items=(array 'SequelizeModule') path='@nestjs/sequelize')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'Repository')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Seeder')
                        (sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Module') path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.boundedContextName) '.module'))
            (object items='GraphQLConfigModule' path='@aurora/graphql/graphql-config.module')
            (object items='* as request' path='supertest' defaultImport=true)
            (object items='* as _' path='lodash' defaultImport=true)
    )
~}}
{{#if (hasI18nProperties schema.aggregateProperties) }}
{{ push importsArray
    (object items='CoreAddI18nConstraintService' path=config.auroraCorePackage)
    (object items=(sumStrings (toPascalCase schema.boundedContextName) 'I' (toPascalCase schema.moduleName) 'I18nRepository') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
~}}
{{/if}}
{{#if schema.hasOAuth}}
{{ push importsArray
    (object items='Auth' path='@aurora/decorators')
~}}
{{/if}}
{{#if schema.hasTenant}}
{{ push importsArray
    (object items='AccountResponse' path=(sumStrings config.appContainer '/iam/account'))
    (object items='TenantPolicy' path=(sumStrings config.appContainer '/iam/shared'))
    (object items='CurrentAccount' path=config.auroraCorePackage)
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
// disable import foreign modules, can be micro-services
const importForeignModules = [];
{{setVar 'language' '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a'}}
describe('{{ toKebabCase schema.moduleName }}', () =>
{
    let app: INestApplication;
    let {{ toCamelCase schema.moduleName }}Repository: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository;
    {{#if (hasI18nProperties schema.aggregateProperties) }}
    let repositoryI18n: {{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository;
    {{/if }}
    let {{ toCamelCase schema.moduleName }}Seeder: {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Seeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                {{ toPascalCase schema.boundedContextName }}Module,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                {{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Seeder,
            ],
        })
            {{#if schema.hasOAuth }}
            .overrideGuard(Auth)
            .useValue({ canActivate: () => true })
            {{/if }}
            {{#if (hasI18nProperties schema.aggregateProperties) }}
            .overrideProvider(CoreAddI18nConstraintService)
            .useValue({
                add: () =>
                    ({
                        include: [{
                            association: '{{ toCamelCase schema.moduleName }}I18n',
                            required   : true,
                            where      : { langId: '{{ language }}' },
                        }],
                    }),
            })
            {{/if }}
            .compile();

        mockData = {{ toCamelCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Data;
        app = module.createNestApplication();
        {{ toCamelCase schema.moduleName }}Repository = module.get<{{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository>({{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}Repository);
        {{#if (hasI18nProperties schema.aggregateProperties) }}
        repositoryI18n  = module.get<{{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository>({{ toPascalCase schema.boundedContextName }}I{{ toPascalCase schema.moduleName }}I18nRepository);
        {{/if}}
        {{ toCamelCase schema.moduleName }}Seeder = module.get<{{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Seeder>({{ toPascalCase schema.boundedContextName }}Mock{{ toPascalCase schema.moduleName }}Seeder);

        // seed mock data in memory database
        {{#if (hasI18nProperties schema.aggregateProperties) }}
        await {{ toCamelCase schema.moduleName }}Repository.insert({{ toCamelCase schema.moduleName }}Seeder.collectionSource.filter((item, index, self) => index === self.findIndex(t => t.id.value === item.id.value)));
        await repositoryI18n.insert({{ toCamelCase schema.moduleName }}Seeder.collectionSource, { dataFactory: aggregate => aggregate.toI18nDTO() });
        {{else}}
        await {{ toCamelCase schema.moduleName }}Repository.insert({{ toCamelCase schema.moduleName }}Seeder.collectionSource);
        {{/if}}

        await app.init();
    });

    {{#each (getNotNullableProperties schema.aggregateProperties)  as |notNullPropety notNullPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty notNullPropety) (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}: null,{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} must be defined, can not be null');
            });
    });

    {{/each}}
    {{#each (getNotNullableProperties schema.aggregateProperties)  as |notNullPropety notNullPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty notNullPropety) (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}: undefined,{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} must be defined, can not be undefined');
            });
    });

    {{/each}}
    {{#each (getLengthProperties schema.aggregateProperties)  as |hasLengthPropety hasLengthPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} is not allowed, must be a length of {{ hasLengthPropety.length }}', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty hasLengthPropety)  (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}eProperty this) }}: {{#if hasQuotation }}'{{/if }}{{{ mocker (object property=testPropety type='fixedData' scapeQuotes=false checkFieldNameMeaning=false length=(add testPropety.length 1)) }}}{{#if hasQuotation }}'{{/if }},{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} is not allowed, must be a length of {{ hasLengthPropety.length }}');
            });
    });

    {{/each}}
    {{#each (getMaxLengthProperties schema.aggregateProperties)  as |hasMaxLengthPropety hasMaxLengthPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} is too large, has a maximum length of {{ hasMaxLengthPropety.maxLength }}', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty hasMaxLengthPropety)  (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}: {{#if hasQuotation }}'{{/if }}{{{ mocker (object property=testPropety type='fixedData' scapeQuotes=false checkFieldNameMeaning=false maxLength=(add testPropety.maxLength 1)) }}}{{#if hasQuotation }}'{{/if }},{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} is too large, has a maximum length of {{ hasMaxLengthPropety.maxLength }}');
            });
    });

    {{/each}}
    {{#each (getMaxLengthProperties schema.aggregateProperties)  as |hasMinLengthPropety hasMinLengthPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} is too short, has a minimum length of {{ propertyHasMinLength.minLength }}', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty hasMinLengthPropety)  (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}eProperty this) }}eProperty this) }}: {{#if hasQuotation }}'{{/if }}{{{ mocker (object property=testPropety type='fixedData' scapeQuotes=false checkFieldNameMeaning=false minLength=(subtract testPropety.minLength 1)) }}}{{#if hasQuotation }}'{{/if }},{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} is too short, has a minimum length of {{ propertyHasMinLength.minLength }}');
            });
    });
    {{/each}}
    {{#each (getIntegerProperties schema.aggregateProperties)  as |isIntegerPropety isIntegerPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} has to be a integer value', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty isIntegerPropety)  (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}: 100.10,{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} has to be a integer value');
            });
    });
    {{/each}}
    {{#each (getIntegerUnsignedProperties schema.aggregateProperties)  as |isIntegerUnsignedPropety isIntegerUnsignedPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty isIntegerUnsignedPropety)  (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}: -1,{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} must have a positive sign, this field does not accept negative values');
            });
    });
    {{/each}}
    {{#each (getBooleanProperties schema.aggregateProperties)  as |isBooleanPropety isBooleanPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty isBooleanPropety)  (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}: 'true',{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} has to be a boolean value');
            });
    });
    {{/each}}
    {{#each (getEnumProperties schema.aggregateProperties) as |isEnumPropety isEnumPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} has to be a enum option of {{ join enumOptions }}', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty isEnumPropety)  (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}: '****',{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} has to be any of this options: {{ join enumOptions }}');
            });
    });
    {{/each}}
    {{#each schema.aggregateProperties.isTimestamp  as |isTimestampPropety isTimestampPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} has to be a timestamp value', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty isTimestampPropety)  (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}eProperty this) }}: '****',{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} has to be a timestamp value');
            });
    });
    {{/each}}
    {{#each (getDecimalProperties schema.aggregateProperties)  as |decimalPropety decimalPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} is too large, has a maximum decimal integers length of {{ subtract (first decimalPropety.decimals) (last decimalPropety.decimals) }}', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty decimalPropety)  (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}: {{{ mocker (object property=testPropety type='fixedData' totalDigits=(add (first testPropety.decimals) 1) decimalDigits=(last testPropety.decimals)) }}},{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} is too large, has a maximum length of {{ subtract (first decimalPropety.decimals) (last decimalPropety.decimals) }} integers in');
            });
    });
    {{/each}}
    {{#each (getDecimalProperties schema.aggregateProperties)  as |decimalPropety decimalPropetyId|}}
    test('/REST:POST {{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create - Got 400 Conflict, {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} is too large, has a maximum decimals length of {{ last decimalPropety.decimals }}', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase ../schema.boundedContextName }}/{{ toKebabCase ../schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                {{#each ../schema.aggregateProperties.test as |testPropety testPropetyId|}}{{#eq (getNameProperty decimalPropety)  (getNameProperty testPropety) }}{{ toCamelCase (getNameProperty this) }}eProperty this) }}eProperty this) }}eProperty this) }}: {{{ mocker (object property=testPropety type='fixedData' totalDigits=(first testPropety.decimals) decimalDigits=(add (last testPropety.decimals) 1)) }}},{{/eq}}{{/each}}
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for {{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase (getNameProperty this) }} is too large, has a maximum length of {{ last decimalPropety.decimals }} decimals in');
            });
    });
    {{/each}}

    test('/REST:POST {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleNames }}/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleNames }}/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: {{ toCamelCase schema.moduleName }}Seeder.collectionResponse{{#if (hasI18nProperties schema.aggregateProperties) }}.filter(item => item.langId === '{{ language }}'){{/if}}.length,
                    count: {{ toCamelCase schema.moduleName }}Seeder.collectionResponse{{#if (hasI18nProperties schema.aggregateProperties) }}.filter(item => item.langId === '{{ language }}'){{/if}}.length,
                    rows : {{ toCamelCase schema.moduleName }}Seeder.collectionResponse{{#if (hasI18nProperties schema.aggregateProperties) }}.filter(item => item.langId === '{{ language }}'){{/if}}.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'{{> manyToManyArrayItems }}]))).slice(0, 5),
                });
            });
    });

    test('/REST:POST {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleNames }}/get', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleNames }}/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    {{ toCamelCase schema.moduleName }}Seeder.collectionResponse{{#if (hasI18nProperties schema.aggregateProperties) }}.filter(item => item.langId === '{{ language }}'){{/if}}.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'{{> manyToManyArrayItems }}]))),
                );
            });
    });

    test('/REST:POST {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '{{ uuid schema.boundedContextName schema.moduleName "REST:POST/find - Got 404 Not Found" }}',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/create', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '{{{ mocker (object type='fixedUuid') }}}',
            })
            .expect(201);
    });

    test('/REST:POST {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/find', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '{{{ mocker (object type='fixedUuid') }}}',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '{{{ mocker (object type='fixedUuid') }}}');
            });
    });

    test('/REST:POST {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/find/{{ uuid schema.boundedContextName schema.moduleName "REST:POST/find/{id} - Got 404 Not Found" }}')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/find/{{{ mocker (object type='fixedUuid') }}}')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '{{{ mocker (object type='fixedUuid') }}}');
            });
    });

    test('/REST:PUT {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '{{ uuid schema.boundedContextName schema.moduleName "REST:PUT/update - Got 404 Not Found" }}',
            })
            .expect(404);
    });

    test('/REST:PUT {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/update', () =>
    {
        return request(app.getHttpServer())
            .put('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '{{{ mocker (object type='fixedUuid') }}}',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '{{{ mocker (object type='fixedUuid') }}}');
            });
    });

    test('/REST:DELETE {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/delete/{{ uuid schema.boundedContextName schema.moduleName "REST:DELETE/delete/{id} - Got 404 Not Found" }}')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE {{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/delete/{{{ mocker (object type='fixedUuid') }}}')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }} - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input!)
                    {
                        {{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }} (payload:$payload)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLCreateQuery}}
                            {{ toCamelCase (getNameProperty this) }}eProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.originalError.message).toContain('already exist in database');
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        {{ toCamelCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }} (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.{{ toCamelCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}).toEqual({
                    total: {{ toCamelCase schema.moduleName }}Seeder.collectionResponse{{#if (hasI18nProperties schema.aggregateProperties) }}.filter(item => item.langId === '{{ language }}'){{/if}}.length,
                    count: {{ toCamelCase schema.moduleName }}Seeder.collectionResponse{{#if (hasI18nProperties schema.aggregateProperties) }}.filter(item => item.langId === '{{ language }}'){{/if}}.length,
                    rows : {{ toCamelCase schema.moduleName }}Seeder.collectionResponse{{#if (hasI18nProperties schema.aggregateProperties) }}.filter(item => item.langId === '{{ language }}'){{/if}}.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'{{> manyToManyArrayItems }}]))).slice(0, 5),
                });
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        {{ toCamelCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }} (query:$query)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLFindQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.{{ toCamelCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}.entries())
                {
                    expect({{ toCamelCase schema.moduleName }}Seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input!)
                    {
                        {{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }} (payload:$payload)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLCreateQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '{{{ mocker (object type='fixedUuid') }}}',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.{{ toCamelCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}).toHaveProperty('id', '{{{ mocker (object type='fixedUuid') }}}');
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }} (query:$query)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLFindQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '{{ uuid schema.boundedContextName schema.moduleName "GraphQL/Find - Got 404 Not Found" }}',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }} (query:$query)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLFindQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '{{{ mocker (object type='fixedUuid') }}}',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.{{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}.id).toStrictEqual('{{{ mocker (object type='fixedUuid') }}}');
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById (id:$id)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLFindQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables: {
                    id: '{{ uuid schema.boundedContextName schema.moduleName "GraphQL/FindById - Got 404 Not Found" }}',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        {{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById (id:$id)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLFindByIdQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables: {
                    id: '{{{ mocker (object type='fixedUuid') }}}',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.{{ toCamelCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ById.id).toStrictEqual('{{{ mocker (object type='fixedUuid') }}}');
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput!)
                    {
                        {{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ById (payload:$payload)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLUpdateQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '{{ uuid schema.boundedContextName schema.moduleName "GraphQL/UpdateById - Got 404 Not Found" }}',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput!)
                    {
                        {{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ById (payload:$payload)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLUpdateQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '{{{ mocker (object type='fixedUuid') }}}',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.{{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ById.id).toStrictEqual('{{{ mocker (object type='fixedUuid') }}}');
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Input! $query: QueryStatement)
                    {
                        {{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }} (payload:$payload query:$query)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLUpdateQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '{{{ mocker (object type='fixedUuid') }}}',
                    },
                    query: {
                        where: {
                            id: '{{{ mocker (object type='fixedUuid') }}}',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.{{ toCamelCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}[0].id).toStrictEqual('{{{ mocker (object type='fixedUuid') }}}');
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        {{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById (id:$id)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLDeleteQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables: {
                    id: '{{ uuid schema.boundedContextName schema.moduleName "GraphQL/DeleteById - Got 404 Not Found" }}',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL {{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        {{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById (id:$id)
                        {
                            {{#each schema.aggregateProperties.postmanGraphQLDeleteQuery}}
                            {{ toCamelCase (getNameProperty this) }}
                            {{/each}}
                        }
                    }
                `,
                variables: {
                    id: '{{{ mocker (object type='fixedUuid') }}}',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.{{ toCamelCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ById.id).toStrictEqual('{{{ mocker (object type='fixedUuid') }}}');
            });
    });

    afterAll(async () =>
    {
        await {{ toCamelCase schema.moduleName }}Repository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
