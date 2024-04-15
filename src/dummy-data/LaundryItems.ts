const types: ['laundry', 'dry', 'pressing'] = ['laundry', 'dry', 'pressing'];
const laundryItems = [
    {
        name: 'Áo thun',
        description: 'T-shirt',
    },
    {
        name: 'Quần Âu',
        description: 'Trousers',
    },
    {
        name: 'Quần jeans',
        description: 'Jeans',
    },
    {
        name: 'Áo khoác Jeans',
        description: 'Jeans',
    },
    {
        name: 'Áo khoác',
        description: 'Jacket',
    },
];
interface IItem {
    name: string;
    description: string;
    unitPrice: number;
    type: 'laundry' | 'dry' | 'pressing';
}
const mapTypeToItem = () => {
    let results: IItem[] = [];
    types.forEach(type => {
        results = [
            ...results,
            ...laundryItems.map(item => {
                const unitPrice = Math.random() * 30 * 1000;
                return {
                    ...item,
                    type,
                    unitPrice,
                };
            }),
        ];
    });
    return results;
};
export const laundryData = mapTypeToItem();
