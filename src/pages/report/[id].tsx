import { getReportDataAsync } from '@/apis/admin';
import ReportTemplate from '@/components/admin/ReportTemplate';
import NavigationBar from '@/components/common/NavigationBar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Report = () => {
  const router = useRouter();
  const id = Number(router.query.id as string);

  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await getReportDataAsync(id);
      if (res.isSuccess) {
        setData(res.result.response);
      }
    };

    if (id) getData();
  }, [id]);

  return (
    <>
      <NavigationBar activeTab="report" />
      {data ? (
        <ReportTemplate data={data} />
      ) : (
        <div style={{ position: 'fixed', top: 100, left: 30 }}>
          리포트 데이터가 없습니다
        </div>
      )}
    </>
  );
};

export default Report;
