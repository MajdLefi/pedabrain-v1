"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  children: ReactNode;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ display: "inline-flex", textAlign: "center", flexWrap: "wrap", gap: "5px" }}>
      {React.Children.map(children, (child, index) => (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
        >
          {child}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;
