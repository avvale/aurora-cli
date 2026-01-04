// blur-active-element.decorator.ts
export function BlurActiveElement(): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const active = document.activeElement as HTMLElement | null;

            if (active && typeof active.blur === 'function') {
                active.blur();
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}
