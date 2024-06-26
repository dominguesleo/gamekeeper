
import { AndroidIcon, AppleIcon, LinuxIcon, NintendoIcon, PlayStationIcon, WindowsIcon, XboxIcon} from '@/components/icons/PlatformIcon'

const platformIcons = {
    playstation: <PlayStationIcon/>,
    xbox: <XboxIcon />,
    nintendo: <NintendoIcon />,
    android: <AndroidIcon key={1}/>,
    windows: <WindowsIcon key={2}/>,
    pc: <WindowsIcon />,
    applemacintosh: <AppleIcon />,
    linux: <LinuxIcon />,
};

export const getPlatformIcon = (platform) => {
    const platformIcon = platformIcons[platform.toLowerCase().replace(/\s/g, '')];
    return platformIcon || null;
};