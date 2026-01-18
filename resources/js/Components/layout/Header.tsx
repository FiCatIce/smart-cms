import { usePage, router } from '@inertiajs/react';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/Components/ui/dropdown-menu";
import { Button } from '@/Components/ui/button';
import { LogOut } from 'lucide-react';

export default function Header() {
    // Ambil data user dari Inertia
    const { auth } = usePage().props as any;
    const user = auth.user;
    
    // Inisial Nama (Misal: "Admin" -> "A")
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 shadow-sm">
            {/* Bagian Kiri: Judul Halaman */}
            <div className="font-semibold text-lg text-foreground">
                SmartTX Panel
            </div>

            {/* Bagian Kanan: User Dropdown */}
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full focus:ring-0 ring-offset-0 p-0">
                            {/* Avatar Circle */}
                            <div className="h-10 w-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold shadow-sm hover:bg-cyan-700 transition-colors cursor-pointer">
                                {userInitial}
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user?.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem 
                            onClick={() => router.post(route('logout'))} 
                            className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}