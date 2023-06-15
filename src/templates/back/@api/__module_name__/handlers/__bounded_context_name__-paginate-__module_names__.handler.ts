{{
    setVar 'importsArray' (
        array
            (object items=(array 'Injectable') path='@nestjs/common')
            (object items=(array 'IQueryBus' 'QueryStatement') path=config.auroraCorePackage)
            (object items='Pagination' path='@api/graphql')
            (object items=(sumStrings 'Paginate' (toPascalCase schema.moduleNames) 'Query') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/application/paginate/paginate-' (toKebabCase schema.moduleNames) '.query'))
    )
~}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(array 'BadRequestException') path='@nestjs/common')
    (object items=(array 'CoreAddI18nConstraintService' 'CoreGetSearchKeyLangService') path=config.auroraCorePackage)
~}}
{{/if}}
{{#if schema.hasTenant}}
{{ push importsArray
    (object items='AccountResponse' path=(sumStrings config.appContainer '/iam/account/domain/account.response'))
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Paginate{{ toPascalCase schema.moduleNames }}Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
        {{#if schema.properties.hasI18n}}
        private readonly coreAddI18nConstraintService: CoreAddI18nConstraintService,
        private readonly coreGetSearchKeyLangService: CoreGetSearchKeyLangService,
        {{/if}}
    ) {}

    async main(
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        {{#if schema.properties.hasI18n}}
        contentLanguage?: string,
        {{/if}}
    ): Promise<Pagination>
    {
        {{#if schema.properties.hasI18n}}
        if (!contentLanguage) throw new BadRequestException('To paginate a multi-language objects, the content-language header must be defined.');

        constraint = await this.coreAddI18nConstraintService.add(
            constraint,
            '{{ toCamelCase schema.moduleName }}I18n',
            contentLanguage,
            {
                searchKeyLang: this.coreGetSearchKeyLangService.get(),
            },
        );

        {{/if}}
        return await this.queryBus.ask(new Paginate{{ toPascalCase schema.moduleNames }}Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}