type MenuItem = {
    title: string;
    description: string;
    price: number;
    img?: ImageMetadata;
    category: string;
}

type Menu = Record<string, MenuItem>