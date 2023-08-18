import { useEffect, useState } from 'react';
import NavigationBar from '@/components/common/NavigationBar';
import ReportListTemplate from '@/components/admin/ReportListTemplate';

const Report = () => {
  // 인플루언서 리스트 데이터
  const [data, setData] = useState([]);

  // 인플루언서 리스트 데이터 호출
  useEffect(() => {
    const getReportList = async () => {
      //  const res = await getReportListAsync();
      //  if (res.isSuccess) {
      //    setData(res.result.response);
      //  }
    };

    getReportList();
  }, []);

  return (
    <>
      <NavigationBar activeTab="report" />
      <ReportListTemplate data={data} />
    </>
  );
};

export default Report;
