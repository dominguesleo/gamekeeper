import { AppStoreIcon, EpicGamesIcon, GogIcon, NintendoIcon, PlayStationIcon, PlayStoreIcon, SteamIcon, XboxIcon } from '@/components/icons/StoreIcon'

const storeIcons = {
    playstationstore: <PlayStationIcon />,
    xboxstore: <XboxIcon />,
    nintendo: <NintendoIcon key={1}/>,
    nintendostore: <NintendoIcon key={2}/>,
    steam: <SteamIcon />,
    epicgames: <EpicGamesIcon />,
    gog: <GogIcon />,
    apple: <AppStoreIcon key={3}/>,
    appstore: <AppStoreIcon key={4}/>,
    android: <PlayStoreIcon key={5}/>,
    googleplay: <PlayStoreIcon key={6}/>,
};

export const getStoreIcon = (store) => {
    const storeIcon = storeIcons[store.toLowerCase().replace(/\s/g, '')];
    return storeIcon || null;
}