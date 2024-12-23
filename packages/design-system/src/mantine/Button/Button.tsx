// src/components/Button/Button.tsx
import React from 'react';
import { Button as MantineButton } from '@mantine/core';
import styles from './Button.module.scss';
import { clsx } from 'clsx';

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof MantineButton> {
  variant?:
    | 'filled'
    | 'light'
    | 'outline'
    | 'subtle'
    | 'white'
    | 'gradient'
    | 'default'
    | 'custom'; // Added custom variant
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Button = ({
  variant = 'filled',
  size = 'md',
  color = 'blue',
  fullWidth = false,
  children,
  icon,
  className,
  ...props
}: ButtonProps) => {
  const buttonClasses = clsx(
    styles.button,
    {
      [styles.customVariant]: variant === 'custom',
      [styles.withIcon]: !!icon,
    },
    className,
  );

  return (
    <MantineButton
      variant={variant === 'custom' ? 'filled' : variant}
      size={size}
      color={color}
      fullWidth={fullWidth}
      className={buttonClasses}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </MantineButton>
  );
};
