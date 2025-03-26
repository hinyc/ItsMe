export interface IGlobalState {
  showMainNav: boolean;
  showSignUpModal: boolean;
}

export interface IGlobalSetState {
  setShowMainNav: (show: boolean) => void;
  setShowSignUpModal: (show: boolean) => void;
}
