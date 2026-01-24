/* eslint-disable indent */
/* eslint-disable key-spacing */
import { WhatsappTimelineModel } from '@app/whatsapp/timeline';
import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  modelName: 'WhatsappConversation',
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['wabaConversationId'],
      unique: true,
    },
    {
      fields: ['wabaContactId'],
      unique: false,
    },
  ],
})
export class WhatsappConversationModel extends Model<WhatsappConversationModel> {
  @Column({
    field: 'id',
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
  })
  id: string;

  @Column({
    field: 'wabaConversationId',
    allowNull: false,
    type: DataTypes.STRING(63),
  })
  wabaConversationId: string;

  @ForeignKey(() => WhatsappTimelineModel)
  @Column({
    field: 'timelineId',
    allowNull: false,
    type: DataTypes.UUID,
  })
  timelineId: string;

  @BelongsTo(() => WhatsappTimelineModel, {
    constraints: false,
    foreignKey: 'timelineId',
  })
  timeline: WhatsappTimelineModel;

  @Column({
    field: 'wabaContactId',
    allowNull: false,
    type: DataTypes.STRING(36),
  })
  wabaContactId: string;

  @Column({
    field: 'expiration',
    allowNull: false,
    type: DataTypes.STRING(36),
  })
  expiration: string;

  @Column({
    field: 'category',
    allowNull: false,
    type: DataTypes.STRING(63),
  })
  category: string;

  @Column({
    field: 'isBillable',
    allowNull: false,
    type: DataTypes.BOOLEAN,
  })
  isBillable: boolean;

  @Column({
    field: 'pricingModel',
    allowNull: false,
    type: DataTypes.STRING(36),
  })
  pricingModel: string;

  @Column({
    field: 'createdAt',
    allowNull: true,
    type: DataTypes.DATE,
  })
  createdAt: string;

  @Column({
    field: 'updatedAt',
    allowNull: true,
    type: DataTypes.DATE,
  })
  updatedAt: string;

  @Column({
    field: 'deletedAt',
    allowNull: true,
    type: DataTypes.DATE,
  })
  deletedAt: string;
}
