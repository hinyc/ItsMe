import useGlobalStore from '@/index';
import React from 'react';

export default function NeedNicknameModal() {
  return (
    <div>
      NeedNicknameModal
      <div>
        <button
          onClick={() => {
            useGlobalStore.getState().setShowNeedNicknameModal(false);
          }}
        >
          close
        </button>
      </div>
    </div>
  );
}
