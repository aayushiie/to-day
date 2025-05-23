import React from "react";
import { useMotionValue, Reorder } from "framer-motion";

export const Item = ({ item }) => {
  const y = useMotionValue(0);

  return (
    <Reorder.Item value={item} id={item} style={{ y }}>
      <span>{item}</span>
    </Reorder.Item>
  );
};