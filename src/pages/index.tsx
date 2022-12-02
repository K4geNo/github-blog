import { useCallback, useEffect, useState } from "react"

import { IssueSearch } from "@/components/IssueSearch"
import { Issues } from "@/components/Issues"
import { Profile } from "@/components/Profile"
import { Spinner } from "@/components/Spinner"
import { api } from "@/lib/axios"

const username = "K4geNo"
const repository = "github-blog"

export interface Issue {
    title: string
    body: string
    created_at: string
    number: number
    html_url: string
    comments: number
    user: {
        login: string
    }
}

export default function Home() {
    const [issues, setIssues] = useState<Issue[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const getIssues = useCallback(
        async (query: string = "") => {
            try {
                setIsLoading(true)
                const response = await api.get(
                    `/search/issues?q=${query}%20repo:${username}/${repository}`
                )

                setIssues(response.data.items)
            } finally {
                setIsLoading(false)
            }
        },
        [issues]
    )

    useEffect(() => {
        getIssues()
    }, [])

    return (
        <div className="mx-auto flex w-full max-w-[54rem] flex-col items-center justify-center">
            <Profile />
            <IssueSearch getIssues={getIssues} issueLength={issues.length} />

            {isLoading ? (
                <div className="mt-12 flex w-full items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <div className="mt-12 mb-16 grid w-full grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                    {issues.map((issue) => (
                        <Issues key={issue.number} issue={issue} />
                    ))}
                </div>
            )}
        </div>
    )
}
