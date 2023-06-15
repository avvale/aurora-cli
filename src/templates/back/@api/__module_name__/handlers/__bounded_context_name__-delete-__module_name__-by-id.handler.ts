{{
    setVar 'importsArray' (
        array
            (object items=(array 'Injectable') path='@nestjs/common')
            (object items=(array 'AuditingMeta' 'ICommandBus' 'IQueryBus' 'QueryStatement') path=config.auroraCorePackage)
            (object items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName)) path='@api/graphql')
            (object items=(sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Dto') path='../dto')
            (object items=(sumStrings 'Find' (toPascalCase schema.moduleName) 'ByIdQuery') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/find/find-' (toKebabCase schema.moduleName) '-by-id.query'))
            (object items=(sumStrings 'Delete' (toPascalCase schema.moduleName) 'ByIdCommand') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/delete/delete-' (toKebabCase schema.moduleName) '-by-id.command'))
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(array 'BadRequestException') path='@nestjs/common')
    (object items=(array 'CoreAddI18nConstraintService' 'CoreGetSearchKeyLangService' 'CoreGetFallbackLangService' 'CoreGetContentLanguageObjectService') path=config.auroraCorePackage)
~}}
{{/if}}
{{#if schema.hasTenant}}
{{ push importsArray
    (object items='AccountResponse' path=(sumStrings config.appContainer '/iam/account/domain/account.response'))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleName }}ByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        {{#if schema.properties.hasI18n}}
        private readonly coreAddI18nConstraintService: CoreAddI18nConstraintService,
        private readonly coreGetContentLanguageObjectService: CoreGetContentLanguageObjectService,
        private readonly coreGetFallbackLangService: CoreGetFallbackLangService,
        private readonly coreGetSearchKeyLangService: CoreGetSearchKeyLangService,
        {{/if}}
    ) {}

    async main(
        id: string,
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
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
        if (!contentLanguage) throw new BadRequestException('To delete a multi-language object, the content-language header must be defined.');

        constraint = await this.coreAddI18nConstraintService.add(
            constraint,
            '{{ toCamelCase schema.moduleName }}I18n',
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        {{/if}}
        const {{ toCamelCase schema.moduleName }} = await this.queryBus.ask(new Find{{ toPascalCase schema.moduleName }}ByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new Delete{{ toPascalCase schema.moduleName }}ByIdCommand(
            id,
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
                    fallbackLang   : await this.coreGetFallbackLangService.get(),
                    contentLanguage: await this.coreGetContentLanguageObjectService.get(contentLanguage),
                },
                {{/if}}
            },
        ));

        return {{ toCamelCase schema.moduleName }};
    }
}