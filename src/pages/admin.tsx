import { getMatchingDataAsync } from '@/apis/admin';
import AdminTemplate from '@/components/admin/AdminTemplate';
import NavigationBar from '@/components/common/NavigationBar';
import { useEffect, useState } from 'react';

const Admin = () => {
  const [matchingData, setMatchingData] = useState<any[]>([]);

  useEffect(() => {
    const getDatas = async () => {
      // [매칭 신청, 매칭 진행중, 매칭 종료]
      const [res1, res2, res3] = await Promise.all([
        getMatchingDataAsync(1),
        getMatchingDataAsync(2),
        getMatchingDataAsync(3),
      ]);

      setMatchingData([
        res1.result.response,
        res2.result.response,
        res3.result.response,
      ]);
    };
    getDatas();
  }, []);

  return (
    <>
      <NavigationBar activeTab="admin" />
      <AdminTemplate matchingData={matchingData} />
    </>
  );
};

export default Admin;
