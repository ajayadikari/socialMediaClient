'use client'

import Item from './Item'
import { House, Search, Handshake, UsersRound, UserRoundPen, X, PanelRightOpen } from 'lucide-react'
import { useState } from 'react'

const Index = () => {
    const items = [
        {
            name: 'home',
            logo: House,
            link: '/'
        },
        {
            name: 'search',
            logo: Search,
            link: '/search'
        },
        {
            name: 'friends',
            logo: Handshake,
            link: '/friends'
        },
        {
            name: 'club',
            logo: UsersRound,
            link: '/clubs'
        },
        {
            name: 'profile',
            logo: UserRoundPen,
            link: '/profile'
        }
    ]
    const [active, setActive] = useState(0)
    const [navActive, setNavActive] = useState(true)

    return (

        navActive ? (
            <div className='grid grid-cols-6 gap-6 fixed bottom-5 right-[50%] translate-x-[50%] border-[2px] border-black rounded-full px-5 py-2 backdrop-blur-[2px] delay-75 duration-1000 ease-in-out' >
                {
                    items.map((item, i) => (
                        <Item
                            setActive={setActive}
                            active={active}
                            name={item.name}
                            icon={item.logo}
                            link={item.link}
                            id={i}
                            key={i}
                        />
                    ))
                }
                < X onClick={() => setNavActive(false)} className='self-center' />
            </div >
        ) : <div onClick={() => setNavActive(true)} className='absolute right-0 bottom-4 border border-black rounded-full p-3 backdrop-blur-[2px] duration-1000 ease-in-out delay-75'>
            <PanelRightOpen />
        </div>
    )
}

export default Index
