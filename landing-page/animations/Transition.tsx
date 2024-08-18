"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TransitionProps {
  children: ReactNode;
}

const Transition: React.FC<TransitionProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
