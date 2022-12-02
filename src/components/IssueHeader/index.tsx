import {
    FaCalendar,
    FaChevronLeft,
    FaComment,
    FaExternalLinkAlt,
    FaGithub,
} from "react-icons/fa"

import { Issue } from "@/pages"
import Link from "next/link"
import { formatDate } from "@/utils/formatter"

interface IssueHeaderProps {
    issue: Issue
}

export function IssueHeader({ issue }: IssueHeaderProps) {
    const formattedDate = formatDate(issue.created_at)

    return (
        <div className="z-10 -mt-20 w-full rounded-[10px] bg-base-profile py-6 px-6 shadow-md sm:px-10 sm:py-8">
            <div className="flex items-center justify-between">
                <Link href="/" passHref legacyBehavior>
                    <a className="flex items-center gap-2 font-nunito text-xs font-bold uppercase text-blue">
                        <FaChevronLeft size={12} />
                        Voltar
                    </a>
                </Link>

                <Link href={issue.html_url} passHref legacyBehavior>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-nunito text-xs font-bold uppercase text-blue"
                    >
                        ver no github
                        <FaExternalLinkAlt size={12} />
                    </a>
                </Link>
            </div>

            <div className="mt-5 flex flex-col">
                <strong className="font-nunito text-xl font-bold text-base-title sm:text-2xl">
                    {issue.title}
                </strong>

                <div className="mt-4 flex flex-wrap gap-4 font-nunito text-base-span sm:mt-2 sm:flex-row sm:gap-8">
                    <div className="flex items-center gap-2">
                        <FaGithub size={18} />
                        <span className="text-sm sm:text-base">
                            {issue.user.login}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCalendar size={18} />
                        <span className="text-sm sm:text-base">
                            {formattedDate}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaComment size={18} />
                        <span className="text-sm sm:text-base">
                            {issue.comments} comentários
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
