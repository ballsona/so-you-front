import { useEffect, useState } from 'react';
import ReportListTemplate from '@/components/admin/ReportListTemplate';
import Layout from '@/components/common/Layout';

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
    <Layout activeTab="report">
      <ReportListTemplate data={data} />
    </Layout>
  );
};

export default Report;
