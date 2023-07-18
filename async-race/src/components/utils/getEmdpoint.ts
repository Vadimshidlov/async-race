export function getEndpoint(): number {
    if (window.innerWidth <= 650) {
        return 78;
    }
    if (window.innerWidth <= 600) {
        return 76;
    }

    return 85;
}
