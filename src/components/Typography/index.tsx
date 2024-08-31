import { cn } from '@/lib/utils';
import React from 'react';

type TypographyProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'caption' | 'overline';
  children: React.ReactNode;
  className?: string;
}

const Typography = ({ variant = 'p', children, className = '' } : TypographyProps) => {
  const baseStyles = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-semibold',
    h6: 'text-base font-semibold',
    p: 'text-base',
    span: 'text-base',
    caption: 'text-sm',
    overline: 'text-xs uppercase',
  };

  const TypographyComponent = variant as keyof JSX.IntrinsicElements;

  return (
    <TypographyComponent className={cn(baseStyles[variant], className)}>
      {children}
    </TypographyComponent>
  );
};

export default Typography;
