import Image from "next/image"
import logoGithub from "../../assets/Logo.svg"

export function Header() {
    return (
        <header className="relative flex h-[18.5rem] w-full items-center justify-center bg-coverBg bg-cover bg-center">
            <Image
                src={logoGithub}
                alt="Github Logo"
                className="-mt-28 h-24 w-[9.25rem]"
            />
        </header>
    )
}
