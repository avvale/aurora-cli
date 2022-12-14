import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class BootstrapService
{
    constructor(
        private readonly configService: ConfigService,
        private readonly sequelize: Sequelize,
    ) {}

    async onApplicationBootstrap(): Promise<void>
    {
        if (
            this.configService.get('DATABASE_SYNCHRONIZE') === 'true' &&
            this.configService.get('DATABASE_SYNCHRONIZE_ALTER') === 'true'
        )
        {
            await this.sequelize.sync({ alter: true });
        }
    }
}
