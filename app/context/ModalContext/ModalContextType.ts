import React from 'react';

export type ModalContextType = ModalOptions & {
  show: (options: ModalOptions) => void;
};

export type ModalOptions = {
  open: boolean;
  modalHeight?: string;
  modalWidth?: string;
  modalHeader?: React.ReactNode | string;
  modalBody?: React.ReactNode | string;
  modalFooter?: React.ReactNode;
};

export type ModalContextProviderPropsType = {
  children: React.ReactNode;
};
