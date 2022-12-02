import { FaExternalLinkAlt, FaGithub, FaUserFriends } from "react-icons/fa"
import { useCallback, useEffect, useState } from "react"

import Link from "next/link"
import { Spinner } from "../Spinner"
import { api } from "@/lib/axios"
import axios from "axios"

interface User {
    id: number
    html_url: string
    name: string
    avatar_url: string
    bio: string
    login: string
    followers: number
}

export function Profile() {
    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(true)

    const getUserData = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await api.get("/users/K4geNo")

            setUser(response.data)
        } finally {
            setIsLoading(false)
        }
    }, [user])

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className="z-10 -mt-20 w-full rounded-[10px] bg-base-profile py-8 px-10 shadow-md">
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="flex w-full flex-col gap-8 sm:flex-row md:flex-row">
                    <img
                        src={user ? user.avatar_url : ""}
                        alt=""
                        className="h-full w-full rounded-md sm:h-[148px] sm:w-[148px]"
                    />

                    <div className="flex w-full flex-col gap-2">
                        <div className="flex w-full items-center justify-between">
                            <h1 className="font-nunito text-xl font-bold text-base-title sm:text-2xl">
                                {user?.name}
                            </h1>

                            <Link
                                href={user ? user.html_url : ""}
                                passHref
                                legacyBehavior
                            >
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 font-nunito text-[12px] font-bold uppercase text-blue"
                                >
                                    <span>github</span>
                                    <FaExternalLinkAlt size={12} />
                                </a>
                            </Link>
                        </div>

                        <p className="font-nunito text-sm font-normal text-base-text sm:text-base">
                            {user?.bio}
                        </p>

                        <div className="mt-7 flex gap-6 text-base-subtitle">
                            <div className="flex items-center gap-2">
                                <FaGithub
                                    size={18}
                                    className="text-base-label"
                                />
                                <p className="font-nunito text-sm sm:text-base">
                                    {user?.login}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <FaUserFriends
                                    size={18}
                                    className="text-base-label"
                                />
                                <p className="font-nunito text-sm sm:text-base">
                                    {user?.followers} seguidores
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
