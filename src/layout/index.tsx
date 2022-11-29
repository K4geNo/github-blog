import { Header } from "@/components/Header"

type Props = {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Header />
            <main className="h-screen bg-base-background">{children}</main>
        </>
    )
}
