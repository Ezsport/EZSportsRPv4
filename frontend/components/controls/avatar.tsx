import React from 'react';
import Image from 'next/image';
import { UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarVariant = 'default' | 'rounded' | 'circle';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  className?: string;
  fallbackIcon?: React.ReactNode;
  fallbackText?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  'xs': 'w-6 h-6 text-xs',
  'sm': 'w-8 h-8 text-sm',
  'md': 'w-10 h-10 text-base',
  'lg': 'w-12 h-12 text-lg',
  'xl': 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

const variantClasses: Record<AvatarVariant, string> = {
  'default': 'rounded-sm',
  'rounded': 'rounded-md',
  'circle': 'rounded-full',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  variant = 'circle',
  className,
  fallbackIcon = <UserIcon />,
  fallbackText,
}) => {
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];

  const renderAvatar = () => {
    if (src) {
      return (
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className={cn(
            'object-cover object-center',
            sizeClass,
            variantClass,
            className
          )}
        />
      );
    }

    if (fallbackText) {
      return (
        <div
          className={cn(
            'flex items-center justify-center bg-gray-200 text-gray-700 font-semibold',
            sizeClass,
            variantClass,
            className
          )}
        >
          {fallbackText.charAt(0).toUpperCase()}
        </div>
      );
    }

    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-100 text-gray-500',
          sizeClass,
          variantClass,
          className
        )}
      >
        {fallbackIcon}
      </div>
    );
  };

  return renderAvatar();
};
