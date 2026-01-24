export class CommonLangResponse {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly image: string,
    public readonly iso6392: string,
    public readonly iso6393: string,
    public readonly ietf: string,
    public readonly customCode: string,
    public readonly dir: string,
    public readonly sort: number,
    public readonly isActive: boolean,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
  ) {}
}
