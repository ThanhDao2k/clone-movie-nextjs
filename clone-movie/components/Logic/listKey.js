import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export const listSocialNetWorks = [
    {
        key: 'facebook_id', icon: <FacebookIcon/>, baseUrl: '//www.facebook.com'
    }, {
        key: 'instagram_id', icon: <InstagramIcon/>, baseUrl: '//www.instagram.com'
    }, {
        key: 'twitter_id', icon: <TwitterIcon/>, baseUrl: '//twitter.com'
    },
]
export const listTab = [
    {key: 'review', label: "Review"},
    {key: 'tab2', label: " tab 2"},
    {key: 'tab3', label: " tab 3"},
    {key: 'tab4', label: " tab 4"},
]
export const listMenu = [
    {
        id: 'home', label: 'Home',
        // children: [
        //     {
        //         key: "children1", value: "children1"
        //     }, {
        //         key: "children2", value: "children2"
        //     }, {
        //         key: "children3", value: "children3"
        //     }
        // ]
    },
    {
        id: 'movies', label: 'movies', children: [
            {
                key: 'popular', value: 'Popular'
            },
            {
                key: 'topRated', value: 'Top Rated'
            },
            {
                key: 'upcoming', value: 'Up Coming'
            },
            {
                key: 'nowPlaying', value: 'Now Playing'
            },
        ]
    },
    {id: 'tvShow', label: 'TV show'},
]