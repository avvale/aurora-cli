import { Injectable } from '@nestjs/common';
import { {{#if schema.properties.hasI18n}}AddI18NConstraintService, FormatLangCode, {{/if}}ICommandBus, IQueryBus } from '{{ config.auroraCorePackage }}';
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '{{ config.applicationsContainer }}/iam/account/domain/account.response';

{{/if}}

// {{ config.applicationsContainer }}
// here yours applications imports

@Injectable()
export class {{ currentAdditionalApi.getClassName }}Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: any,
        {{#if schema.hasTenant}}
        account: AccountResponse,
        {{/if}}
        timezone?: string,
    ): Promise<boolean>
    {
        // coding here
        // await this.commandBus.dispatch(new YourCommand(payload, { timezone }));
        // await this.queryBus.ask(new YourQuery(payload.id, {}, { timezone }));

        return true;
    }
}