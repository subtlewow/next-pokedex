
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";

interface FilterButtonProps {
    onClick: () => void;
    icon: LucideIcon;
    label: string;
    active: boolean;
}

export default function FilterButton({ onClick, icon: Icon, label, active }: FilterButtonProps) {
    const theme = useTheme().theme

    return (
        <div className="flex pl-2 gap-3">
            <motion.div
                className={`px-3 py-1 gap-2 flex items-center justify-around rounded-md text-xs cursor-pointer transition-all duration-200 ${active
                    ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                    : theme == 'dark'
                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                whileHover={{
                    transition: {
                        duration: 0
                    },
                    scale: 1.1
                }}
                whileTap={{ scale: 1, transition: { duration: 0} }}
                onClick={() => {
                    onClick();
                }}
            >
                <Icon className="w-4 h-4" />
                {label}
            </motion.div>
        </div>
    )
}
