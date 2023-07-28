export function generateRandomColor(): string {
    const value: string = (Math.random() * 0xfffff * 1000000).toString(16);

    return `#${value.slice(0, 6)}`;
}


