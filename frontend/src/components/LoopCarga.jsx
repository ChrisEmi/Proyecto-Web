import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../api/Context/AuthContext";

export const LoopInfinito = () => { 
    const { loading } = useAuth();

    useEffect(() => {
        if (loading) return;

    }, [loading]);

    if (loading) {
        return (
            <div
                className="min-h-screen flex flex-col justify-center items-center bg-slate-50"
                style={{
                    minHeight: '100vh',
                    padding: '0',
                }}
            >
                <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg px-10 py-12 border border-slate-200">
                    <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-emerald-50">
                        <div className="animate-spin rounded-full border-4 border-emerald-400 border-t-transparent w-14 h-14"></div>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Cargando...</h1>
                    <p className="text-slate-500 text-base mb-2 text-center max-w-xs">
                        Por favor espera mientras preparamos tu información.
                    </p>
                    <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                        <div
                            className="h-2 bg-emerald-400 rounded-full animate-auth-bar"
                            style={{ width: '100%' }}
                        ></div>
                    </div>
                    <style>
                        {`
                        @keyframes authBar {
                            0% { width: 0%; }
                            50% { width: 80%; }
                            100% { width: 100%; }
                        }
                        .animate-auth-bar {
                            animation: authBar 1.6s cubic-bezier(0.4,0,0.2,1) infinite alternate;
                        }
                        `}
                    </style>
                </div>
            </div>
        );
    }

    return <Outlet />;
};

export default LoopInfinito;