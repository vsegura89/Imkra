import comboImg from "../assets/chickenbox.webp";
import tirasImg from "../assets/pollo-frito-con-patatas-fritas-para-celebracion.png";
import alitas6Img from "../assets/alitas6.jpeg";
import alitas12Img from "../assets/alitas12.jpeg";
import extraImg from "../assets/combo2.webp";


export const menu = {
    "c1": {
        title: "Super Combo",
        description: "8 piezas de pollo, 2 raciones de patatas con sazón IMKRA, consomé, ensalada americana.",
        price: 18.00,
        img: comboImg,
        category: "combo",
    },
    "c2": {
        title: "Cubo de tiras simple",
        description: "6 tiras, 1 ración de patatas",
        price: 8.50,
        img: tirasImg,
        category: "combo",
    },
    "c3": {
        title: "Cubo de tiras doble",
        description: "16/18 tiras, 2 raciones de patatas, ensalada, consomé",
        price: 16.00,
        img: tirasImg,
        category: "combo",
    },
    "c4": {
        title: "Cubo de alitas simple",
        description: "6 alitas broaster, 1 ración de patatas",
        price: 8.50,
        img: alitas6Img,
        category: "combo",
    },
    "c5": {
        title: "Cubo de alitas doble",
        description: "12 alitas broaster, 2 raciones de patatas",
        price: 13.50,
        img: alitas12Img,
        category: "combo",
    },
    "e1": {
        title: "Patatas sazon IMKRA",
        description: "Patatas sazon IMKRA",
        price: 2.50,
        img: extraImg,
        category: "extra",
    },
    "e2": {
        title: "Ensalada americana",
        description: "Ensalada americana",
        price: 2.50,
        img: extraImg,
        category: "extra",
    },
    "e3": {
        title: "Salsa miel",
        description: "Salsa miel",
        price: 1.50,
        img: extraImg,
        category: "extra",
    },
    "e4": {
        title: "Salsa de la casa",
        description: "Salsa de la casa",
        price: 1.50,
        img: extraImg,
        category: "extra",
    },
    "e5": {
        title: "Aji de la casa",
        description: "Aji de la casa",
        price: 1.50,
        img: extraImg,
        category: "extra",
    },
    "e6": {
        title: "Mini arepas",
        description: "Mini arepas",
        price: 3.00,
        img: extraImg,
        category: "extra",
    },
}