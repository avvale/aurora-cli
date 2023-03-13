import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
    BearerStrategy,
    'azure-ad',
)
{
    constructor(
        private readonly configService: ConfigService,
    )
    {
        super({
            identityMetadata: `https://login.microsoftonline.com/${configService.get('AZURE_AD_TENANT_ID')}/v2.0/.well-known/openid-configuration`,
            clientID        : configService.get('AZURE_AD_CLIENT_ID'),
            audience        : configService.get('AZURE_AD_CLIENT_ID'),
            // loggingLevel    : 'debug',
        });
    }

    async validate(data): Promise<any>
    {
        return data;
    }
}
