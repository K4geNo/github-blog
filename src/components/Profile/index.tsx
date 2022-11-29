import { useEffect, useState } from "react"

import { FaExternalLinkAlt } from "react-icons/fa"
import Link from "next/link"
import axios from "axios"

interface User {
    id: number
    html_url: string
    name: string
    avatar_url: string
    bio: string
}

export function Profile() {
    const [user, setUser] = useState<User>()
    console.log("🚀 ~ file: index.tsx:14 ~ Profile ~ user", user)

    async function getUserData() {
        const data = await axios
            .get("https://api.github.com/users/K4geNo")
            .then((response) => setUser(response.data))

        return data
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className="absolute w-full rounded-[10px] bg-base-profile py-8 px-10 shadow-md">
            <div className="flex w-full gap-8">
                <img
                    src={user ? user.avatar_url : ""}
                    alt=""
                    className="h-[148px] w-[148px] rounded-md"
                />

                <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="font-nunito text-2xl font-bold text-base-title">
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

                    <p className="font-nunito text-base-text">{user?.bio}</p>

                    <div className="mt-6 flex gap-6 text-base-subtitle">
                        <p>icon 1</p>
                        <p>icon 2</p>
                        <p>icon 3</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
