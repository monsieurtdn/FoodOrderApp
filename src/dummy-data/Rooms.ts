export const roomsData = new Array(10).fill(null).map((item, index) => ({
    name: 100 + index + 1,
    inspected: Math.random() > 0.5 ? true : false,
    vc: Math.random() > 0.5 ? true : false,
    isVacant: index % 2 === 0,
}));
