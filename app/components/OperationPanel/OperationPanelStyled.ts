import { colors } from '@/app/theme/colors';
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
  background-color: ${({ theme }) => theme.grey.grey105};
  border: 1px solid ${({ theme }) => theme.grey.grey50};
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.grey.grey5};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
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
        return theme.green?.green100;
      case 'failed':
        return theme.red?.red200;
      default:
        return theme.blue?.blue100;
    }
  }};
  flex-shrink: 0;
`;

const StatusText = styled.span`
  font-size: 11px;
  color: ${colors.grey.grey10};
`;

const LabelText = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { PanelWrapper, OperationCard, StatusDot, StatusText, LabelText };
