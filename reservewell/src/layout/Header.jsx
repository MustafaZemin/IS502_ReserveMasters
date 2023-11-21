import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, List, ListItem, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';


const navLinkClasses = 'font-semibold transition-all text-xs xl:text-sm';

const navbarItems = [
    {
        name: 'Ana Sayfa',
        href: '/',
    },
    {
        name: 'Katalog',
        href: '/catalog',
    },
    // {
    //   name: 'Kaynaklar',
    //   href: '/catalog',
    // },
    {
        name: 'Fiyatlandırma',
        href: '/catalog',
    },
    {
        name: 'Hakkımızda',
        href: '/catalog',
    },
];

const navbarAuthItems = [
    {
        name: 'Giriş Yap',
        href: '/login',
    },
    {
        name: 'Kaydol',
        href: '/register',
    },
];

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Add state for the drawer

    const router = useRouter();
    const path = router.pathname;
    const isDesktopScreen = useMediaQuery('(min-width: 1024px)');
    // const isLoggedIn = useSelector(
    //   (state: RootState) => state.auth.userLoginStatus
    // );
    const isLoggedIn = false;

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    return (
        <div className="sticky top-0 z-50 flex h-24 w-full items-center justify-between bg-rwCadetGray px-4 text-neutral drop-shadow-xl sm:px-12 xl:px-32">
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                className="lg:hidden"
                sx={{
                    '& .MuiDrawer-paper': {
                        top: '96px',
                        height: '-webkit-fill-available',
                    },
                }}
            >
                <div className="w-full">
                    <CloseIcon
                        className="float-right mt-2 mr-2 h-8 w-8"
                        onClick={toggleDrawer(false)}
                    />
                </div>
                <Box width={250}>
                    <List>
                        {navbarItems.map((item, index) => (
                            <ListItem key={index}>
                                <Link
                                    // href={item.href}
                                    href={'/'}
                                    className="mb-6 text-xl"
                                >
                                    {item.name}
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <hr className="w-full place-self-center border-2 border-prim" />
                    <List className="mt-6">
                        {navbarAuthItems.map((item, index) => (
                            <ListItem key={index}>
                                <Link
                                    // href={item.href}
                                    href="/"
                                    className="mb-6 text-xl font-semibold"
                                >
                                    {item.name}
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <div className="flex h-full min-w-fit items-center">
                <Link className="transition-all" href="/">
                    {/* <Image
            src={hypercodersLogo}
            alt=""
            height={72}
            className="mr-8 rounded-full"
          /> */}
                </Link>
            </div>
            {!isDesktopScreen && (
                <MenuIcon
                    className=" h-8 w-8 cursor-pointer"
                    onClick={toggleDrawer(true)}
                    sx={{}}
                />
            )}
            <nav className="mx-8 hidden items-center space-x-10 lg:flex xl:space-x-16 ">
                {navbarItems.map((item, index) => (
                    <Link
                        key={index}
                        //  href={item.href}
                        href={'/'}
                        className={navLinkClasses}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            <nav className="mx-8 hidden items-center space-x-16 lg:flex ">
                {!isLoggedIn && (
                    <Link
                        href="/"
                        // href="/login"
                        className={navLinkClasses}
                    >
                        Giriş Yap
                    </Link>
                )}
                {!isLoggedIn && path !== '/register' && (
                    <Link
                        href="/"
                        // href="/register"
                        className={`${navLinkClasses} rounded-full bg-accent px-8 py-4 text-white hover:brightness-110`}
                    >
                        Kaydol
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default Header;
