import * as z from "zod"

import { useEffect, useState } from "react"

import axios from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const searchFormSchema = z.object({
    query: z.string().min(1),
})

type SearchForm = z.infer<typeof searchFormSchema>

interface IssueSearchProps {
    issueLength: number
    getIssues: (query?: string) => Promise<void>
}

export function IssueSearch({ getIssues, issueLength }: IssueSearchProps) {
    const { register, handleSubmit } = useForm<SearchForm>({
        resolver: zodResolver(searchFormSchema),
    })

    async function handleSearchIssues(data: SearchForm) {
        await getIssues(data.query)
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearchIssues)}
            className="mt-[4.5rem] flex w-full flex-col gap-4"
        >
            <div className="flex w-full items-center justify-between">
                <span className="font-nunito text-lg font-bold text-base-subtitle">
                    Publicações
                </span>

                <p className="font-nunito text-sm text-base-span">
                    {issueLength
                        ? issueLength === 1
                            ? `${issueLength} publicação`
                            : `${issueLength} publicações`
                        : ""}
                </p>
            </div>

            <input
                type="text"
                placeholder="Buscar conteúdo"
                className="w-full rounded-md border border-base-border 
                bg-base-input py-3 px-4 font-nunito text-base-text 
                placeholder:font-nunito placeholder:text-base-label 
                focus:border-blue focus:outline-none"
                {...register("query")}
            />
        </form>
    )
}
