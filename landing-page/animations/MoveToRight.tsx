"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";

interface TransitionProps {
  children: ReactNode;
}

const MoveToRight: React.FC<TransitionProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasBeenInView(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      style={{ width: '100%' }}
      transition={{ duration: 1.5 }}
    >
      {children}
    </motion.div>
  );
};

export default MoveToRight;
