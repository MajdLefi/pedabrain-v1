"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ReactNode } from "react";

interface AnimationProps {
  children: ReactNode;
}

const Animation: React.FC<AnimationProps> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      style={{}}
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.75,
        //delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {children}
    </motion.div>
  );
};

export default Animation;
