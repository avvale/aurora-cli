/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */

export class CommonLangResponse {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly name: string,
    public readonly image: string,
    public readonly iso6392: string,
    public readonly iso6393: string,
    public readonly ietf: string,
    public readonly customCode: string,
    public readonly dir: 'LTR' | 'RTL',
    public readonly sort: number,
    public readonly isActive: boolean,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
  ) {}
}
