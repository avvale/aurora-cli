{{
    setVar 'importsArray' (
        array
            (object items=(array 'Injectable') path='@nestjs/common')
            (object items=(array 'AuditingMeta' 'ICommandBus' 'IQueryBus' 'QueryStatement'  'Utils') path=config.auroraCorePackage)
            (object items=(array (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName)) (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdInput')) path='@api/graphql')
            (object items=(array (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Dto') (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdDto')) path='../dto')
            (object items=(sumStrings 'Find' (toPascalCase schema.moduleName) 'ByIdQuery') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/find/find-' (toKebabCase schema.moduleName) '-by-id.query'))
            (object items=(sumStrings 'Update' (toPascalCase schema.moduleName) 'ByIdCommand') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/update/update-' (toKebabCase schema.moduleName) '-by-id.command'))
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
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdHandler
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
        payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdInput | {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto,
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
        if (!contentLanguage) throw new BadRequestException('To update a multi-language object, the content-language header must be defined.');

        const constraintToFindById = await this.coreAddI18nConstraintService.add(
            {},
            '{{ toCamelCase schema.moduleName }}I18n',
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        {{/if}}
        const {{ toCamelCase schema.moduleName }} = await this.queryBus.ask(new Find{{ toPascalCase schema.moduleName }}ByIdQuery(
            payload.id,
            {{#if schema.properties.hasI18n}}
            constraintToFindById,
            {{else}}
            constraint,
            {{/if}}
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, {{ toCamelCase schema.moduleName }});

        {{#if schema.properties.hasI18n}}
        const contentLanguageObject = await this.coreGetContentLanguageObjectService.get(contentLanguage);

        {{/if}}
        await this.commandBus.dispatch(new Update{{ toPascalCase schema.moduleName }}ByIdCommand(
            {
                ...dataToUpdate,
                {{#if schema.properties.hasI18n}}
                id    : payload.id,
                langId: contentLanguageObject.id,
                {{else}}
                id: payload.id,
                {{/if}}
            },
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
                    contentLanguage: contentLanguageObject,
                },
                {{/if}}
            },
        ));

        return await this.queryBus.ask(new Find{{ toPascalCase schema.moduleName }}ByIdQuery(
            payload.id,
            {{#if schema.properties.hasI18n}}
            constraintToFindById,
            {{else}}
            constraint,
            {{/if}}
            {
                timezone,
            },
        ));
    }
}