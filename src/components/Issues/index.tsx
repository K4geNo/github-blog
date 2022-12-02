import { IIssue } from "@/interface/issue"
import Link from "next/link"
import { formatDate } from "@/utils/formatter"

interface IssueProps {
    issue: IIssue
}

export function Issues({ issue }: IssueProps) {
    const formattedDate = formatDate(issue.created_at)

    return (
        <Link
            href={`/issue/${issue.number}`}
            className="cursor-pointer rounded-[10px] border-2 border-solid
            border-base-post bg-base-post p-8 text-white transition
            hover:border-base-label"
        >
            <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row">
                <strong className="flex-1 font-nunito text-lg font-bold leading-8 sm:text-xl">
                    {issue.title}
                </strong>

                <time className="w-max overflow-hidden text-ellipsis pt-[6px] font-nunito text-sm text-base-span">
                    {formattedDate}
                </time>
            </div>
            <p className="mt-5 text-clip font-nunito text-base-text line-clamp-4">
                {issue.body}
            </p>
        </Link>
    )
}
