import { Header } from "@/components/Header"

type Props = {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-base-background px-4 sm:px-5 md:px-4 lg:px-0">
                {children}
            </main>
        </>
    )
}
