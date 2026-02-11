

export interface Game {
    id: string;
    title: string;
    developer: string;
    image: string;
    category: string;
    popular?: boolean;
}

export interface DiamondPackage {
    id: string;
    amount: number;
    bonus?: number;
    price: number;
    label?: string;
}

export const games: Game[] = [
    { id: "mobile-legends", title: "Mobile Legends", developer: "Moonton", image: "https://placehold.co/600x400", category: "MOBA", popular: true },
    { id: "genshin-impact", title: "Genshin Impact", developer: "HoYoverse", image: "https://placehold.co/600x400", category: "RPG", popular: true },
    { id: "free-fire", title: "Free Fire", developer: "Garena", image: "https://placehold.co/600x400", category: "Battle Royale", popular: true },
    { id: "pubg-mobile", title: "PUBG Mobile", developer: "Tencent", image: "https://placehold.co/600x400", category: "Battle Royale", popular: true },
    { id: "valorant", title: "Valorant", developer: "Riot Games", image: "https://placehold.co/600x400", category: "FPS" },
    { id: "cod-mobile", title: "Call of Duty Mobile", developer: "Activision", image: "https://placehold.co/600x400", category: "FPS" },
    { id: "honkai-starrail", title: "Honkai: Star Rail", developer: "HoYoverse", image: "https://placehold.co/600x400", category: "RPG" },
    { id: "roblox", title: "Roblox", developer: "Roblox Corp", image: "https://placehold.co/600x400", category: "Sandbox" },
];

export const diamondPackages: DiamondPackage[] = [
    { id: "pkg-1", amount: 86, price: 1.49, label: "Starter" },
    { id: "pkg-2", amount: 172, price: 2.89 },
    { id: "pkg-3", amount: 257, price: 4.29 },
    { id: "pkg-4", amount: 344, bonus: 34, price: 5.69 },
    { id: "pkg-5", amount: 514, bonus: 57, price: 8.49, label: "Popular" },
    { id: "pkg-6", amount: 706, bonus: 78, price: 11.49 },
    { id: "pkg-7", amount: 1050, bonus: 105, price: 16.99 },
    { id: "pkg-8", amount: 2195, bonus: 219, price: 34.99, label: "Best Value" },
];

export const paymentMethods = [
    { id: "dana", name: "DANA", icon: "Wallet" as const },
    { id: "gopay", name: "GoPay", icon: "Wallet" as const },
    { id: "ovo", name: "OVO", icon: "Wallet" as const },
    { id: "qris", name: "QRIS", icon: "QrCode" as const },
    { id: "bca", name: "Bank BCA", icon: "Building2" as const },
    { id: "mandiri", name: "Bank Mandiri", icon: "Building2" as const },
];
