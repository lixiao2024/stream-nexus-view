
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [pointerEvents, setPointerEvents] = useState<"none" | "auto">("none");
  const [opacity, setOpacity] = useState(0);

  const onMouseEnter = () => {
    setPointerEvents("auto");
    setOpacity(1);
  };

  const onMouseLeave = () => {
    setPointerEvents("none");
    setOpacity(0);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    
    setTransform(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.1, 1.1, 1.1)`);
  };

  return (
    <div
      className={cn(
        "relative group/pin z-50",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transform,
          transition: "all 0.15s ease",
        }}
      >
        <div className={cn("w-full h-full", className)}>
          {children}
        </div>

        {href && (
          <div
            className={cn(
              "absolute inset-0 origin-top w-full h-full bg-transparent",
              "flex items-center justify-center pointer-events-none"
            )}
            style={{ 
              opacity,
              transition: "opacity 0.5s ease",
            }}
          >
            <div
              className="absolute inset-x-0 mx-auto shadow-md w-[2px] top-0 bottom-12 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
              style={{
                zIndex: -1,
              }}
            />
            <div className="bg-black border border-white/[0.2] rounded-full py-2 px-4 flex items-center gap-2">
              <span className="text-white text-sm">
                {title || "查看详情"}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
