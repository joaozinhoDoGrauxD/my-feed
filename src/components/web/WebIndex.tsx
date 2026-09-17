import React from "react";
import Header from "@/components/web/header/HeaderWeb";
import Input from "@/components/web/input/Input";
import { Box } from "@/gluestack/box";
import useTheme from "@/hooks/useTheme";

export default function WebIndex() {
  const { isDark } = useTheme();

  return (
    <Box
      className={`relative flex-1 min-h-screen transition-colors duration-500 overflow-hidden ${
        isDark ? "bg-[#0d0f17]" : "bg-slate-100"
      }`}
    >
      {/* Dynamic Ambient Background Elements (Liquid Glow) */}
      <Box
        className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-all duration-500 ${
          isDark ? "bg-indigo-600/20" : "bg-indigo-300/40"
        }`}
      />
      <Box
        className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-500 ${
          isDark ? "bg-sky-500/15" : "bg-sky-300/30"
        }`}
      />
      <Box
        className={`absolute top-[35%] left-[40%] w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none transition-all duration-500 ${
          isDark ? "bg-purple-600/15" : "bg-purple-300/30"
        }`}
      />

      {/* Main Glass Layout Container */}
      <Box className="relative z-10 flex-1 flex flex-col min-h-screen">
        <Header />

        <Box className="max-w-[850px] w-full mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <Box
            className={`p-6 sm:p-8 rounded-3xl backdrop-blur-2xl transition-all duration-300 ${
              isDark
                ? "bg-white/[0.03] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                : "bg-white/70 border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            }`}
          >
            <Input />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}