import { Module } from '@nestjs/common';
import { SharedModule } from '@aurora/shared.module';
import { SequelizeConfigModule } from '@aurorajs.dev/core';
import { IamModule } from '@api/iam/iam.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        IamModule,
    ],
})
export class SeederModule {}