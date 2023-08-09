export class CommonCreatedAdministrativeAreaLevel1Event
{
    constructor(
        public readonly id: string,
        public readonly countryId: string,
        public readonly code: string,
        public readonly customCode: string,
        public readonly name: string,
        public readonly slug: string,
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly zoom: number,
        public readonly mapType: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
