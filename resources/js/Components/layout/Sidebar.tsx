import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react"; // Import Link Inertia
import {
  Home,
  Building2,
  Landmark,
  MapPin,
  Server,
  Phone,
  GitBranch,
  RefreshCw,
  Volume2,
  Mic,
  FileText,
  Clock,
  PhoneCall,
  Monitor,
  Smartphone,
  Globe,
  Users2,
  Shield,
  FileCode,
  BookOpen,
  UserCog,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;       // URL tujuan
  children?: {         // Array untuk Submenu (Anak)
    label: string; 
    href: string 
  }[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function Sidebar() {
  // Ambil URL saat ini agar menu aktif otomatis menyesuaikan
  const { url } = usePage(); 
  
  // State untuk Section Utama (Organization, Connectivity, dll)
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Organization", "Connectivity", "Log", "Device", "User"
  ]);

  // State khusus untuk Submenu (seperti "Line")
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Definisikan Struktur Menu
  const navSections: NavSection[] = [
    {
      title: "Organization",
      items: [
        { icon: Building2, label: "Company", href: "#" },
        { icon: Landmark, label: "Head Office", href: "#" },
        { icon: MapPin, label: "Branch", href: "#" },
      ],
    },
    {
      title: "Connectivity",
      items: [
        { icon: Server, label: "Call Server", href: route('connectivity.call-server.index') },
        { 
          icon: Phone, 
          label: "Line", 
          // Submenu Line kita definisikan di sini
          children: [
            { label: "VPW", href: "#" },
            { label: "CAS", href: "#" },
            // Ini link ke halaman Extension yang kita buat
            { label: "Extension", href: route('connectivity.line.extension.index') }, 
          ] 
        },
        { icon: GitBranch, label: "Trunk", href: "#" },
        { 
          icon: RefreshCw, 
          label: "Call Routing", 
          children: [ // Contoh submenu routing
            { label: "Inbound", href: "#" },
            { label: "Outbound", href: "#" },
          ]
        },
        { icon: Volume2, label: "Intercom", href: "#" },
        { icon: Mic, label: "Dev Turret", href: "#" },
      ],
    },
    {
      title: "Log",
      items: [
        { icon: FileText, label: "System Log", href: "#" },
        { icon: Clock, label: "Activity", href: "#" },
        { icon: PhoneCall, label: "Call Log", href: "#" },
      ],
    },
    {
      title: "Turret Management",
      items: [{ icon: Phone, label: "Turret Users", href: "#" }],
    },
    {
      title: "Device",
      items: [
        { icon: Monitor, label: "UCX Turret", href: "#" },
        { icon: Smartphone, label: "3rd Party", href: "#" },
        { icon: Globe, label: "Web Device", href: "#" },
      ],
    },
    {
      title: "User",
      items: [
        { icon: Users2, label: "Group", href: "#" },
        { icon: Shield, label: "Policy/Role", href: "#" },
        { icon: FileCode, label: "Template", href: "#" },
        { icon: BookOpen, label: "Phonebook", href: "#" },
      ],
    },
    {
      title: "Administration",
      items: [{ icon: UserCog, 
          label: "CMS Admins", 
          href: route('administration.cms-admin.index') }],
    },
  ];

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((t) => t !== label)
        : [...prev, label]
    );
  };

  // Fungsi helper untuk cek active state (termasuk partial match URL)
  const isActive = (href?: string) => {
     if (!href) return false;
     if (href === '#' || href === '') return false;
     // Cek apakah URL browser mengandung href menu ini
     return new URL(href, window.location.origin).pathname === url;
  };

  return (
    <aside className="w-[var(--sidebar-width)] bg-sidebar-background border-r border-sidebar-border h-screen overflow-y-auto flex-shrink-0">
      {/* Logo */}
      <div className="h-[var(--header-height)] flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Link href={route('dashboard')}>
                    <img 
                        src="/images/image.png"  // Pastikan path sesuai dengan lokasi di folder public
                        alt="SmartTX Logo" 
                        className="h-16 w-auto object-contain" // Sesuaikan h-8 (32px) atau h-10 (40px)
                    />
                </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        {/* Dashboard Link */}
        <Link
          href="/dashboard" // Ganti sesuai route dashboard kamu
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md transition-colors mb-2 cursor-pointer",
            url === '/dashboard' 
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
              : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
          )}
        >
          <Home size={18} />
          <span>Dashboard</span>
        </Link>

        {/* Sections */}
        {navSections.map((section) => (
          <div key={section.title} className="mb-1">
            <div
              className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              {expandedSections.includes(section.title) ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </div>

            {expandedSections.includes(section.title) && (
              <div className="space-y-0.5 mt-1">
                {section.items.map((item) => (
                  <div key={item.label}>
                    {/* LOGIKA RENDERING ITEM: Apakah dia punya anak (Submenu) atau Link biasa? */}
                    
                    {item.children ? (
                      // === JIKA PUNYA SUBMENU (CONTOH: LINE) ===
                      <div>
                        <div
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer text-sm",
                            // Highlight jika salah satu anaknya aktif
                            item.children.some(child => isActive(child.href)) 
                                ? "text-foreground font-medium" 
                                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                          )}
                          onClick={() => toggleSubmenu(item.label)}
                        >
                          <item.icon size={18} />
                          <span className="flex-1">{item.label}</span>
                          {expandedMenus.includes(item.label) ? (
                             <ChevronUp size={14} />
                          ) : (
                             <ChevronDown size={14} />
                          )}
                        </div>
                        
                        {/* Render Anak-Anak Submenu */}
                        {expandedMenus.includes(item.label) && (
                            <div className="ml-9 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-2">
                                {item.children.map((child) => (
                                    <Link
                                        key={child.label}
                                        href={child.href}
                                        className={cn(
                                            "block px-3 py-1.5 rounded-md text-sm transition-colors",
                                            isActive(child.href)
                                                ? "bg-sidebar-accent text-cyan-400 font-medium" // Active State Anak
                                                : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                                        )}
                                    >
                                        {child.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                      </div>
                    ) : (
                      // === JIKA ITEM BIASA (TANPA SUBMENU) ===
                      <Link
                        href={item.href || '#'}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm",
                          isActive(item.href)
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                        )}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}