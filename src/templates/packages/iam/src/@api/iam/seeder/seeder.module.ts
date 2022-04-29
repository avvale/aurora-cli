import { Module } from '@nestjs/common';
import { SequelizeConfigModule } from 'aurora-ts-core';
import { SharedModule } from '../../../@aurora/shared.module';
import { IamModule } from '../iam.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        IamModule,
    ],
})
export class SeederModule {}