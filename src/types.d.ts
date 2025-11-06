type MenuItem = {
    title: string;
    description: string;
    price: number;
    img?: ImageMetadata;
}

type Menu = Record<string, MenuItem>