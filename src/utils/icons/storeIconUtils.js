import { AppStoreIcon, EpicGamesIcon, GogIcon, NintendoIcon, PlayStationIcon, PlayStoreIcon, SteamIcon, XboxIcon } from '@/components/icons/StoreIcon'

const storeIcons = {
    playstationstore: <PlayStationIcon />,
    xboxstore: <XboxIcon />,
    nintendo: <NintendoIcon />,
    nintendostore: <NintendoIcon />,
    steam: <SteamIcon />,
    epicgames: <EpicGamesIcon />,
    gog: <GogIcon />,
    apple: <AppStoreIcon />,
    appstore: <AppStoreIcon />,
    android: <PlayStoreIcon />,
    googleplay: <PlayStoreIcon />,
};

export const getStoreIcon = (store) => {
    const storeIcon = storeIcons[store.toLowerCase().replace(/\s/g, '')];
    return storeIcon || null;
}