"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";

interface TransitionProps {
  children: ReactNode;
}

const AnimationFade: React.FC<TransitionProps> = ({ children }) => {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationFade;



