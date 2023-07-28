const SMALL_WIDTH_SCREEN = 600
const SMALL_WIDTH_VALUE = 76

const MIDDLE_WIDTH_SCREEN = 650
const MIDDLE_WIDTH_VALUE = 78

const LARGE_WIDTH_VALUE = 87

export function getRaceEndPoint(): number {
    if (window.innerWidth <= MIDDLE_WIDTH_SCREEN) {
        return MIDDLE_WIDTH_VALUE;
    }

    if (window.innerWidth <= SMALL_WIDTH_SCREEN) {
        return SMALL_WIDTH_VALUE;
    }

    return LARGE_WIDTH_VALUE;
}
