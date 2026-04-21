import React, { ElementType } from 'react';
import { cn } from '../../lib/utils';

interface TypographyProps {
  as?: ElementType;
  variant:
    | 'heading-l'
    | 'heading-m'
    | 'heading-s'
    | 'heading-s-variant'
    | 'body'
    | 'body-variant';
  className?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  as,
  variant,
  className,
  children,
}) => {
  const Component = as || ('span' as ElementType);

  const baseStyles = 'font-spartan';

  const variants = {
    'heading-l': 'text-heading-l font-bold text-black dark:text-white',
    'heading-m': 'text-heading-m font-bold text-black dark:text-white',
    'heading-s': 'text-heading-s font-bold text-black dark:text-white',
    'heading-s-variant': 'text-heading-s-variant font-bold text-black dark:text-white',
    body: 'text-body font-medium',
    'body-variant': 'text-body-variant font-medium',
  };

  return (
    <Component className={cn(baseStyles, variants[variant], className)}>
      {children}
    </Component>
  );
};
