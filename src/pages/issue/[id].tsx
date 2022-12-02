import { GetStaticPaths, GetStaticProps } from "next"

import { IIssue } from "@/interface/issue"
import { IssueHeader } from "@/components/IssueHeader"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { api } from "@/lib/axios"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface IssueProps {
    issue: IIssue
}

export default function Issue({ issue }: IssueProps) {
    return (
        <div className="mx-auto flex w-full max-w-[54rem] flex-col items-center justify-center">
            <IssueHeader issue={issue} />

            <section className="mb-12 flex flex-col gap-4 px-4 py-10 font-nunito text-base-text sm:px-8">
                <ReactMarkdown
                    children={issue.body}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "")
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(
                                        /\n$/,
                                        ""
                                    )}
                                    style={dracula as any}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        },
                    }}
                />
            </section>
        </div>
    )
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
    params,
}) => {
    const issueNumber = params?.id

    const { data } = await api.get(
        `/repos/K4geNo/github-blog/issues/${issueNumber}`
    )

    return {
        props: {
            issue: data,
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: "blocking", //indicates the type of fallback
    }
}
