import { Module } from '@nestjs/common';
import { AzureADStrategy } from './azure-ad.strategy';

@Module({
    providers: [
        AzureADStrategy,
    ],
})
export class AzureAdModule {}
