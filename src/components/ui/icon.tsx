
import React from 'react';
import { LucideProps } from 'lucide-react';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name?: string;
  iconNode?: React.ReactNode;
}

export const Icon = ({ iconNode, ...props }: IconProps) => {
  // Instead of spreading all props onto the div, just render the iconNode
  // which already has the props applied from Lucide
  return (
    <div className={props.className}>
      {iconNode}
    </div>
  );
};
