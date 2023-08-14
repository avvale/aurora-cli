{{
    setVar 'importsArray' (
        array
            (object items=(array 'Injectable') path='@nestjs/common')
            (object items=(array 'ICommandBus' 'IQueryBus') path=config.auroraCorePackage)
            (object items=(array (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName)) (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Input' )) path='@api/graphql')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Dto')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Dto' )
                )
                path=(sumStrings config.apiContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
            )
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Command')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Find' (toPascalCase schema.moduleName) 'ByIdQuery')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName)))
    )
~}}
{{#if schema.properties.hasI18n}}
{{
    push importsArray
        (object items=(array 'BadRequestException') path='@nestjs/common')
        (object items=(array 'CoreAddI18nConstraintService' 'CoreGetSearchKeyLangService' 'CoreGetFallbackLangService' 'CoreGetContentLanguageObjectService') path=config.auroraCorePackage)
~}}
{{/if}}
{{#if schema.hasAuditing}}
{{
    push importsArray
        (object items=(array 'AuditingMeta') path=config.auroraCorePackage)
~}}
{{/if}}
{{#if schema.hasTenant}}
{{
    push importsArray
        (object items='AccountResponse' path=(sumStrings config.appContainer '/iam/account'))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Handler
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
        payload: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Input | {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto,
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
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
        if (!contentLanguage) throw new BadRequestException('To create a multi-language object, the content-language header must be defined.');

        {{/if}}
        await this.commandBus.dispatch(new {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Command(
            payload,
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

        {{#if schema.properties.hasI18n}}
        const constraint = await this.coreAddI18nConstraintService.add(
            {},
            '{{ toCamelCase schema.moduleName }}I18n',
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        return await this.queryBus.ask(new {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
        {{else}}
        return await this.queryBus.ask(new {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
        {{/if}}
    }
}
