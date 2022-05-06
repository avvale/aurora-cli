import { Module } from '@nestjs/common';
import { SharedModule } from '@aurora/shared.module';
import { SequelizeConfigModule } from 'aurora-ts-core';
import { OAuthModule } from '@api/o-auth/o-auth.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        OAuthModule,
    ],
})
export class SeederModule {}