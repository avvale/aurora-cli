export class Operations
{
    /*    static async generatePackage(): Promise<void>
    {
        if (!Operations.stateService.packageName) throw new Error('To create package is required package name');

        // create directory for application
        if (!fs.existsSync(Operations.stateService.packageName || '')) fs.mkdirSync(Operations.stateService.packageName, { recursive: true });

        await TemplateGenerator.generateStaticContents(
            TemplateElement.BACK_PACKAGE,
            path.join(Operations.stateService.packageName),
            '.',
        );
    }*/

    /*
    static async generateDashboard(): Promise<void>
    {
        if (!Operations.stateService.dashboardName) throw new Error('To create dashboard is required dashboard name');

        // create directory for dashboard
        if (!fs.existsSync(Operations.stateService.dashboardName)) fs.mkdirSync(Operations.stateService.dashboardName, { recursive: true });

        await TemplateGenerator.generateStaticContents(
            TemplateElement.FRONT_APPLICATION,
            path.join(Operations.stateService.dashboardName),
            '.',
            { useTemplateEngine: false },
        );
    }*/

    /*
    static async installBackPackage(packageName: string): Promise<void>
    {
        // create pipeline files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.BACK_PACKAGES,
            '.',
            '.',
            {
                templateElementPath: path.join(packageName.toKebabCase()),
            },
        );
    }*/

    /*
    static async installFrontPackage(packageName: string): Promise<void>
    {
        // create pipeline files
        await TemplateGenerator.generateStaticContents(
            TemplateElement.FRONT_PACKAGES,
            '.',
            '.',
            {
                templateElementPath: path.join(packageName.toKebabCase()),
            },
        );
    }*/
}
