import { Navbar } from '@/components/navbar/Navbar';
import { Aside } from '@/components/aside/Aside';

export default function GameLayout({ children }) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <aside>
                    <Aside />
                </aside>
                <section>
                    {children}
                </section>
            </main>
        </>
    );
}