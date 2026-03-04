import { createContext, useContext, useMemo, useState } from 'react';

type OperationStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export type Operation = {
  id: string;
  label: string;
  status: OperationStatus;
  startedAt: number;
  finishedAt?: number;
  errorMessage?: string;
};

type OperationContextValue = {
  operations: Operation[];
  startOperation: (partial: { id?: string; label: string }) => string;
  finishOperation: (
    id: string,
    status?: Exclude<OperationStatus, 'pending'>,
    errorMessage?: string,
  ) => void;
  clearCompleted: () => void;
};

const OperationContext = createContext<OperationContextValue | undefined>(undefined);

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const OperationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [operations, setOperations] = useState<Operation[]>([]);

  const startOperation: OperationContextValue['startOperation'] = ({ id, label }) => {
    const opId = id ?? generateId();
    const now = Date.now();

    setOperations((prev) => [
      ...prev,
      {
        id: opId,
        label,
        status: 'in_progress',
        startedAt: now,
      },
    ]);

    return opId;
  };

  const finishOperation: OperationContextValue['finishOperation'] = (
    id,
    status = 'completed',
    errorMessage,
  ) => {
    const now = Date.now();
    setOperations((prev) =>
      prev.map((op) =>
        op.id === id
          ? {
              ...op,
              status,
              finishedAt: now,
              errorMessage,
            }
          : op,
      ),
    );
  };

  const clearCompleted = () => {
    setOperations((prev) =>
      prev.filter((op) => op.status === 'in_progress' || op.status === 'pending'),
    );
  };

  const value = useMemo(
    () => ({
      operations,
      startOperation,
      finishOperation,
      clearCompleted,
    }),
    [operations],
  );

  return <OperationContext.Provider value={value}>{children}</OperationContext.Provider>;
};

const useOperations = () => {
  const ctx = useContext(OperationContext);
  if (!ctx) {
    throw new Error('useOperations must be used within OperationContextProvider');
  }
  return ctx;
};

export { OperationContextProvider, useOperations };
