"use client";

import { motion } from "framer-motion";

const typeAnimation = {
    "left-right": {
        initial: { x: -10, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { ease: "easeInOut", duration: 0.2 },
    },
    "right-left": {
        initial: { x: 10, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { ease: "easeInOut", duration: 0.2 },
    },
    "top-bottom": {
        initial: { y: -10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { ease: "easeInOut", duration: 0.2 },
    },
    "bottom-top": {
        initial: { y: 10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { ease: "easeInOut", duration: 0.2 },
    },
};

export function TransitionProvider({
    children,
    className,
    type,
}: {
    children: React.ReactNode;
    className?: string;
    type?: keyof typeof typeAnimation;
}) {
    const animation = typeAnimation[type ?? "bottom-top"];

    return (
        <motion.div {...animation} className={className ?? ""}>
            {children}
        </motion.div>
    );
}
