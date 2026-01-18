import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, usePage } from "@inertiajs/react";

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#020817] text-white selection:bg-orange-500 selection:text-white">
            <Head title="Sign in" />

            {/* CARD CONTAINER */}
            <div className="w-full sm:max-w-[400px] px-8 py-10 bg-[#10172a] shadow-2xl rounded-2xl border border-gray-800/50">

                {/* --- LOGO SECTION --- */}
                <div className="flex flex-col items-center mb-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Link href="">
                            <img
                                src="/images/image.png"  // Pastikan path sesuai dengan lokasi di folder public
                                alt="SmartTX Logo"
                                className="h-18 w-auto object-contain" // Sesuaikan h-8 (32px) atau h-10 (40px)
                            />
                        </Link>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Sign in</h2>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-500 text-center">{status}</div>}

                <form onSubmit={submit} className="space-y-5">

                    {/* EMAIL INPUT */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="block font-medium text-sm text-gray-200">
                            Email address<span className="text-red-500 ml-0.5">*</span>
                        </label>

                        {/* Perbaikan: Gunakan focus-within:border-orange-500 */}
                        <div className="flex w-full items-center rounded-lg shadow-sm ring-1 ring-white/10 bg-[#10172a] focus-within:ring-2 focus-within:ring-orange-500 overflow-hidden transition duration-75">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="block w-full border-0 bg-transparent py-2.5 px-3 text-white placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="name@company.com"
                                autoComplete="username"
                            />
                        </div>
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* PASSWORD INPUT */}
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="block font-medium text-sm text-gray-200">
                            Password<span className="text-red-500 ml-0.5">*</span>
                        </label>

                        {/* Perbaikan: Gunakan focus-within:border-orange-500 */}
                        <div className="flex w-full items-center rounded-lg shadow-sm ring-1 ring-white/10 bg-[#10172a] focus-within:ring-2 focus-within:ring-orange-500 overflow-hidden transition duration-75">
                            {/* Input Field */}
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="current-password"
                                placeholder="Masukkan password"
                                className="block w-full border-0 bg-transparent py-2.5 px-3 text-white placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                            />

                            {/* Suffix (Garis & Tombol) */}
                            <div className="flex items-center border-l border-white/10 pl-3 pr-3 h-full">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="flex items-center justify-center text-gray-400 hover:text-gray-300 focus:outline-none focus:text-orange-500 transition"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                                            <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    {/* REMEMBER ME & FORGOT PASS */}
                    <div className="flex items-center justify-between mt-4">
                        <label className="flex items-center cursor-pointer group">
                            {/* Perbaikan Checkbox: Warna Orange */}
                            <div className="relative flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="
                                            /* --- BENTUK DASAR & SHADOW --- */
                                            rounded shadow-sm border-none
                                            w-4 h-4
                                            transition duration-75 
                                            
                                            /* --- RING (PENGGANTI BORDER) --- */
                                            ring-1 ring-gray-950/10 
                                            dark:ring-white/20 
                                            
                                            /* --- BACKGROUND --- */
                                            bg-white 
                                            dark:bg-white/5 
        
                                            /* --- WARNA CENTANG (ORANGE) --- */
                                            text-orange-600 
                                            dark:text-orange-500
                                            dark:checked:bg-orange-500
        
                                            /* --- STATE: FOCUS (GLOW LEMBUT) --- */
                                            focus:ring-2 focus:ring-offset-0 
                                            focus:ring-orange-600 
                                            checked:focus:ring-orange-500/50 
        
                                            /* --- STATE: DARK MODE FOCUS --- */
                                            dark:focus:ring-orange-500 
                                            dark:checked:focus:ring-orange-400/50
        
                                            /* --- STATE: DISABLED (OPSIONAL) --- */
                                            disabled:pointer-events-none disabled:bg-gray-50 disabled:text-gray-50 
                                            dark:disabled:bg-transparent dark:disabled:ring-white/10
                                            "
                                />
                            </div>
                            <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors select-none">Remember me</span>
                        </label>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-2">
                        <PrimaryButton
                            className="w-full justify-center py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-wide rounded-lg shadow-lg shadow-orange-900/20 transition-all active:scale-[0.98] border-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#0b1121]"
                            disabled={processing}
                        >
                            Sign in
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            <div className="mt-8 text-xs text-gray-600">
                &copy; 2026 SmartTX CMS. All rights reserved.
            </div>
        </div>
    );
}