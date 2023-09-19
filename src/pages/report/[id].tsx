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
      // const res = await getReportDataAsync(id);
      // if (res.isSuccess) {
      //  setData(res.result.response);
      // }
      setData(sData.filter((d: any) => d.id === id)[0]);
    };

    if (id) getData();
  }, [id]);

  if (!data) return <>데이터가 존재하지 않습니다</>;

  return (
    <Layout activeTab="report">
      <ReportTemplate data={data} />
    </Layout>
  );
};

export default Report;
