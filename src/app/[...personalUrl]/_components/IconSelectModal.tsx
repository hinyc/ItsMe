import React from 'react';
import { IconType } from 'react-icons';
import { LinkIcon } from '@prisma/client/edge';
import { iconMap } from './LinkICon';

interface IconSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (icon: LinkIcon) => void;
  currentIcon: LinkIcon;
}

export default function IconSelectModal({
  isOpen,
  onClose,
  onSelect,
  currentIcon
}: IconSelectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">아이콘 선택</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            ✕
          </button>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {Array.from(iconMap.entries()).map(([iconType, icons]) => (
            <button
              key={iconType}
              onClick={() => {
                onSelect(iconType);
                onClose();
              }}
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all hover:bg-gray-100 ${
                currentIcon === iconType ? 'bg-me-highlight/20' : ''
              }`}
            >
              {icons[0] && React.createElement(icons[0], { className: 'h-6 w-6' })}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
