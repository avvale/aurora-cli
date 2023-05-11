import { Module } from '@nestjs/common';
import { SharedModule } from '@aurora/shared.module';
import { SequelizeConfigModule } from '@aurorajs.dev/core';
import { CommonModule } from '@api/common/common.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        CommonModule,
    ],
})
export class SeederModule {}