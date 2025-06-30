'use client'

import { ReactNode, SetStateAction, useState, createContext } from "react";

interface ClubContextInt {
    showForm: boolean;
    setShowForm: React.Dispatch<SetStateAction<boolean>>;
    selectedClubId: number | null;
    setSelectedClubId: React.Dispatch<SetStateAction<number | null>>;
    selectedClubName: string;
    setSelectedClubName: React.Dispatch<SetStateAction<string>>;
}


export const ClubContext = createContext<ClubContextInt|null>(null)


export const ClubContextProvider = ({children}: {children:ReactNode}) => {
    const [showForm, setShowForm] = useState<boolean>(false)
    const [selectedClubId, setSelectedClubId] = useState<number | null>(null)
    const [selectedClubName, setSelectedClubName] = useState<string>('')
    return <ClubContext.Provider value={{showForm, setShowForm, selectedClubId, setSelectedClubId, selectedClubName, setSelectedClubName}}>
        {children}
    </ClubContext.Provider>
}