/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { CommonCountryModel } from '@app/common/country/infrastructure/sequelize/sequelize-country.model';
import { CommonAdministrativeAreaLevel1Model } from '@app/common/administrative-area-level-1/infrastructure/sequelize/sequelize-administrative-area-level-1.model';
import { CommonAdministrativeAreaLevel2Model } from '@app/common/administrative-area-level-2/infrastructure/sequelize/sequelize-administrative-area-level-2.model';

@Table({ modelName: 'CommonAdministrativeAreaLevel3', freezeTableName: true, timestamps: false })
export class CommonAdministrativeAreaLevel3Model extends Model<CommonAdministrativeAreaLevel3Model>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => CommonCountryModel)
    @Column({
        field: 'countryId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    countryId: string;

    @BelongsTo(() => CommonCountryModel, {
        constraints: false,
    })
    country: CommonCountryModel;

    @ForeignKey(() => CommonAdministrativeAreaLevel1Model)
    @Column({
        field: 'administrativeAreaLevel1Id',
        allowNull: false,
        type: DataTypes.UUID,
    })
    administrativeAreaLevel1Id: string;

    @BelongsTo(() => CommonAdministrativeAreaLevel1Model, {
        constraints: false,
    })
    administrativeAreaLevel1: CommonAdministrativeAreaLevel1Model;

    @ForeignKey(() => CommonAdministrativeAreaLevel2Model)
    @Column({
        field: 'administrativeAreaLevel2Id',
        allowNull: false,
        type: DataTypes.UUID,
    })
    administrativeAreaLevel2Id: string;

    @BelongsTo(() => CommonAdministrativeAreaLevel2Model, {
        constraints: false,
    })
    administrativeAreaLevel2: CommonAdministrativeAreaLevel2Model;

    @Unique
    @Column({
        field: 'code',
        allowNull: false,
        type: DataTypes.STRING(8),
    })
    code: string;

    @Unique
    @Column({
        field: 'customCode',
        allowNull: true,
        type: DataTypes.STRING(10),
    })
    customCode: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'slug',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    slug: string;

    @Column({
        field: 'latitude',
        allowNull: true,
        type: DataTypes.DECIMAL(17,4),
    })
    latitude: number;

    @Column({
        field: 'longitude',
        allowNull: true,
        type: DataTypes.DECIMAL(17,4),
    })
    longitude: number;

    @Column({
        field: 'zoom',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    zoom: number;

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