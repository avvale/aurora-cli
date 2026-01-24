import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MsEntraIdStrategy } from './ms-entra-id.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'MsEntraId',
    }),
  ],
  providers: [MsEntraIdStrategy],
})
export class MsEntraIdModule {}
