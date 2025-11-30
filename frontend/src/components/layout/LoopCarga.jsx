import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../api/Context/AuthContext";

export const VistaCarga = () => (
    <div
        className="flex flex-col justify-center items-center bg-slate-50 min-h-[110vh]"
    >
        <div className="flex flex-col items-center bg-escom-100 rounded-2xl shadow-xl px-30 py-24 border border-slate-200">
            <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-escom-200">
                <div className="animate-spin rounded-full border-4 border-escom-900 border-t-transparent w-14 h-14"></div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Cargando</h1>
        </div>
    </div>
);

export const LoopCarga = () => { 
    const { loading } = useAuth();

    useEffect(() => {
        if (loading) return;

    }, [loading]);

    if (loading) {
        return <VistaCarga />;
    }

    return <Outlet />;
};

export default LoopCarga;