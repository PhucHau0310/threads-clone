import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PersonIcon from '@mui/icons-material/Person';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ListIcon from '@mui/icons-material/List';

export const pages = [
    {
        title: 'Home',
        icon: HomeOutlinedIcon,
        active: HomeRoundedIcon,
    },
    {
        title: 'Search',
        icon: SearchOutlinedIcon,
        active: SearchOutlinedIcon,
    },
    {
        title: 'Favorite',
        icon: FavoriteBorderIcon,
        active: FavoriteIcon,
    },
    {
        title: 'Personal',
        icon: PermIdentityIcon,
        active: PersonIcon,
    },
];

export const options = [
    {
        title: 'Pin',
        icon: PushPinOutlinedIcon,
    },
    {
        title: 'Menu',
        icon: ListIcon,
    },
];

export const topMenu = [
    {
        title: 'For You',
        route: '/',
    },
    {
        title: 'Following',
        route: '/following',
    },
    {
        title: 'Liked',
        route: '/liked',
    },
    {
        title: 'Saved',
        route: '/saved',
    },
];
