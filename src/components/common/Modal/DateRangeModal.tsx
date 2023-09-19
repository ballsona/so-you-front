import { useModal } from '@/hooks/useModal';
import styled from '@emotion/styled';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

interface DateSelectProps {
  setDateRange: (range: [Date, Date]) => void;
}

const DateRangeModal = ({ setDateRange }: DateSelectProps) => {
  const { closeModal } = useModal();
  const onChangeDateRange = (value: any) => {
    setDateRange([value[0] as Date, value[1] as Date]);
    closeModal();
  };

  return (
    <ModalWrapper>
      <Calendar
        selectRange
        goToRangeStartOnSelect={false}
        onChange={onChangeDateRange}
        className="calendar"
      />
    </ModalWrapper>
  );
};

export default DateRangeModal;

const ModalWrapper = styled.div`
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% + 50px);
`;
