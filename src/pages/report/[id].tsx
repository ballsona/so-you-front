import ReportTemplate, { sData } from '@/components/admin/ReportDetailTemplate';
import Layout from '@/components/common/Layout';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Report = () => {
  const router = useRouter();
  const id = Number(router.query.id as string);

  const [data, setData] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      //const res = await getReportDataAsync(id);
      //if (res.isSuccess) {
      //  setData(res.result.response);
      //}
      setData(sData.filter((d: any) => d.id === id)[0]);
    };

    if (id) getData();
  }, [id]);

  if (!data) return;

  return (
    <Layout activeTab="report">
      {/*{data ? (
        <ReportTemplate data={data} />
      ) : (
        <div style={{ height: '100vh', position: 'fixed', top: 100, left: 30 }}>
          리포트 데이터가 없습니다
        </div>
      )}*/}
      <ReportTemplate data={data} />
    </Layout>
  );
};

export default Report;
