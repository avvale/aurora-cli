import { Module } from '@nestjs/common';
import { SharedModule } from '@aurora/shared.module';
import { SequelizeConfigModule } from '@aurora-ts/core';
import { AuditingModule } from '@api/auditing/auditing.module';

@Module({
    imports: [
        SharedModule,
        SequelizeConfigModule,
        AuditingModule,
    ],
})
export class SeederModule {}