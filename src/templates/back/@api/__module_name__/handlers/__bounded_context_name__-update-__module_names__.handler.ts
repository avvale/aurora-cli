{{
    setVar 'importsArray' (
        array
            (object items=(array 'Injectable') path='@nestjs/common')
            (object items=(array 'AuditingMeta' 'ICommandBus' 'IQueryBus' 'QueryStatement'  'Utils') path=config.auroraCorePackage)
            (object items=(array (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName)) (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleNames) 'Input')) path='@api/graphql')
            (object items=(array (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Dto') (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleNames) 'Dto')) path='../dto')
            (object items=(sumStrings 'Get' (toPascalCase schema.moduleNames) 'Query') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/get/get-' (toKebabCase schema.moduleNames) '.query'))
            (object items=(sumStrings 'Update' (toPascalCase schema.moduleNames) 'Command') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/update/update-' (toKebabCase schema.moduleNames) '.command'))
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(array 'BadRequestException') path='@nestjs/common')
    (object items=(array 'CoreAddI18nConstraintService' 'CoreGetSearchKeyLangService' 'CoreGetContentLanguageObjectService') path=config.auroraCorePackage)
~}}
{{/if}}
{{#if schema.hasTenant}}
{{ push importsArray
    (object items='AccountResponse' path=(sumStrings config.appContainer '/iam/account/domain/account.response'))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        {{#if schema.properties.hasI18n}}
        private readonly coreAddI18nConstraintService: CoreAddI18nConstraintService,
        private readonly coreGetContentLanguageObjectService: CoreGetContentLanguageObjectService,
        private readonly coreGetSearchKeyLangService: CoreGetSearchKeyLangService,
        {{/if}}
    ) {}

    async main(
        payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Input | {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Dto,
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        {{#if schema.properties.hasI18n}}
        contentLanguage?: string,
        {{/if}}
        {{#if schema.hasAuditing}}
        auditing?: AuditingMeta,
        {{/if}}
    ): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }} | {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto>
    {
        {{#if schema.properties.hasI18n}}
        if (!contentLanguage) throw new BadRequestException('To update a multi-language objects, the content-language header must be defined.');

        {{/if}}
        await this.commandBus.dispatch(new Update{{ toPascalCase schema.moduleNames }}Command(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                {{#if schema.hasAuditing}}
                repositoryOptions: {
                    auditing,
                },
                {{/if}}
                {{#if schema.properties.hasI18n}}
                meta: {
                    contentLanguage: await this.coreGetContentLanguageObjectService.get(contentLanguage),
                },
                {{/if}}
            },
        ));

        {{#if schema.properties.hasI18n}}
        constraint = await this.coreAddI18nConstraintService.add(
            {},
            '{{ toCamelCase schema.moduleName }}I18n',
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        {{/if}}
        return await this.queryBus.ask(new Get{{ toPascalCase schema.moduleNames }}Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}