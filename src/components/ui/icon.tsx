
import React from 'react';
import { LucideProps } from 'lucide-react';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name?: string;
  iconNode?: React.ReactNode;
}

export const Icon = ({ iconNode, ...props }: IconProps) => {
  return (
    <div {...props}>
      {iconNode}
    </div>
  );
};
