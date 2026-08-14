import styled from 'styled-components';

const PanelWrapper = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 260px;
  pointer-events: none;
`;

const OperationCard = styled.div<{ isActive: boolean }>`
  background-color: ${({ theme }) => theme.bg.elevated};
  border: 1px solid ${({ theme }) => theme.border.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.text.primary};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  opacity: ${({ isActive }) => (isActive ? 1 : 0.7)};
  pointer-events: auto;
`;

const StatusDot = styled.span<{ status: 'pending' | 'in_progress' | 'completed' | 'failed' }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'completed':
        return theme.status.success;
      case 'failed':
        return theme.status.danger;
      default:
        return theme.status.info;
    }
  }};
  flex-shrink: 0;
`;

const StatusText = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.text.muted};
`;

const LabelText = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { PanelWrapper, OperationCard, StatusDot, StatusText, LabelText };
