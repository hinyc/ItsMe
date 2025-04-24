import React from 'react';
import { IconType } from 'react-icons';
import { LinkIcon } from '@prisma/client/edge';
import { allIcons, IconInfo } from './LinkICon';

interface IconSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (icon: LinkIcon, variant: string) => void;
  currentIcon: LinkIcon;
  currentVariant: string;
}

export default function IconSelectModal({
  isOpen,
  onClose,
  onSelect,
  currentIcon,
  currentVariant
}: IconSelectModalProps) {
  if (!isOpen) return null;

  const handleSelect = (type: LinkIcon, variant: string) => {
    onSelect(type, variant);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-2xl rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">아이콘 선택</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            ✕
          </button>
        </div>
        <div className="grid grid-cols-8 gap-4">
          {allIcons.map(({ type, icon, variant }) => (
            <button
              key={`${type}-${variant}`}
              onClick={() => handleSelect(type, variant)}
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all hover:bg-gray-100 ${
                currentIcon === type && currentVariant === variant
                  ? 'bg-me-highlight/20 ring-2 ring-me-highlight'
                  : ''
              }`}
            >
              {React.createElement(icon, { className: 'h-6 w-6' })}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
