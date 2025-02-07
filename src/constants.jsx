export const BOARD_SIZE = 320;

export const getgrid = (difficulty) => {
    switch (difficulty) {
        case "easy":
            return 3; // 3x3 Grid
        case "medium":
            return 4; // 4x4 Grid
        case "hard":
            return 5; // 5x5 Grid
        default:
            return 4;
    }
};

export const gettile = (GRID_SIZE) => GRID_SIZE * GRID_SIZE;
