import { useState } from "react";
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
  Users,
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

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  hasSubmenu?: boolean;
}

const navSections: NavSection[] = [
  {
    title: "Organization",
    items: [
      { icon: Building2, label: "Company" },
      { icon: Landmark, label: "Head Office" },
      { icon: MapPin, label: "Branch" },
    ],
  },
  {
    title: "Connectivity",
    items: [
      { icon: Server, label: "Call Server" },
      { icon: Phone, label: "Line", hasSubmenu: true },
      { icon: GitBranch, label: "Trunk" },
      { icon: RefreshCw, label: "Call Routing", hasSubmenu: true },
      { icon: Volume2, label: "Intercom" },
      { icon: Mic, label: "Dev Turret" },
    ],
  },
  {
    title: "Log",
    items: [
      { icon: FileText, label: "System Log" },
      { icon: Clock, label: "Activity" },
      { icon: PhoneCall, label: "Call Log" },
    ],
  },
  {
    title: "Turret Management",
    items: [{ icon: Phone, label: "Turret Users" }],
  },
  {
    title: "Device",
    items: [
      { icon: Monitor, label: "UCX Turret" },
      { icon: Smartphone, label: "3rd Party" },
      { icon: Globe, label: "Web Device" },
    ],
  },
  {
    title: "User",
    items: [
      { icon: Users2, label: "Group" },
      { icon: Shield, label: "Policy/Role" },
      { icon: FileCode, label: "Template" },
      { icon: BookOpen, label: "Phonebook" },
    ],
  },
  {
    title: "Administration",
    items: [{ icon: UserCog, label: "CMS Admins" }],
  },
];

export function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    navSections.map((s) => s.title)
  );
  const [activeItem, setActiveItem] = useState("Dashboard");

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="w-[var(--sidebar-width)] bg-sidebar-background border-r border-sidebar-border h-screen overflow-y-auto flex-shrink-0">
      {/* Logo */}
      <div className="h-[var(--header-height)] flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-semibold text-lg tracking-tight">
              mart<span className="text-cyan-400">TX</span>
              <span className="text-cyan-400">≋</span>
            </span>
            <span className="text-primary text-[10px] font-medium -mt-1">CMS</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        {/* Dashboard Link */}
        <div
          className={cn(
            "nav-item mb-2",
            activeItem === "Dashboard" && "nav-item-active"
          )}
          onClick={() => setActiveItem("Dashboard")}
        >
          <Home size={18} />
          <span>Dashboard</span>
        </div>

        {/* Sections */}
        {navSections.map((section) => (
          <div key={section.title} className="mb-1">
            <div
              className="nav-section-title"
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
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "nav-item",
                      activeItem === item.label && "nav-item-active"
                    )}
                    onClick={() => setActiveItem(item.label)}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                    {item.hasSubmenu && (
                      <ChevronDown size={14} className="ml-auto" />
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
