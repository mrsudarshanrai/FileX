import { useEffect } from 'react';
import { useOperations } from '@/app/context/OperationContext';
import { LabelText, OperationCard, PanelWrapper, StatusDot, StatusText } from './OperationPanelStyled';


const OperationPanel = () => {
  const { operations, clearCompleted } = useOperations();

  const visibleOperations = operations.slice(-3);

  useEffect(() => {
    if (!operations.length) return;

    const timer = setTimeout(() => {
      clearCompleted();
    }, 2000);

    return () => clearTimeout(timer);
  }, [operations, clearCompleted]);

  if (!visibleOperations.length) return null;

  return (
    <PanelWrapper>
      {visibleOperations.map((op) => {
        const isActive = op.status === 'in_progress' || op.status === 'pending';
        const statusLabel =
          op.status === 'completed'
            ? 'Completed'
            : op.status === 'failed'
            ? 'Failed'
            : 'Working…';

        return (
          <OperationCard key={op.id} isActive={isActive}>
            <StatusDot status={op.status} />
            <LabelText title={op.label}>{op.label}</LabelText>
            <StatusText>{statusLabel}</StatusText>
          </OperationCard>
        );
      })}
    </PanelWrapper>
  );
};

export default OperationPanel;

