import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "../components/layout/NavMenu.jsx";
import Footer from "../components/layout/Footer.jsx";
import { LoopCarga, VistaCarga } from "../components/layout/LoopCarga.jsx";
import ScrollTop from "../hooks/ScrollTop.jsx";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <NavMenu />
            <main className="flex-1 w-full flex flex-col ">
                <ScrollTop />
                <Suspense fallback={<VistaCarga />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
