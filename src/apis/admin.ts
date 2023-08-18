import { ApiResponse } from '@/types/api';
import { getAsync, postAsync, putAsync } from '.';
import { ReportFormType } from '@/components/admin/CreateReportModal';

/**  */
export async function getMatchingDataAsync(status: number): ApiResponse<any> {
  const response = await getAsync<any>(`/api/admin/project-request/${status}`);
  return response;
}

/**  */
export async function updateMatchingAsync(
  matchingId: number,
  managerEmail: string,
): ApiResponse<any> {
  const response = await putAsync('/api/matching/update', {
    email: managerEmail,
    num: matchingId,
  });
  return response;
}

/** 리포트 작성  */
export async function createReportAsync(
  matchingId: number,
  formFields: any,
): ApiResponse<any> {
  const { title, writer, link, content } = formFields;
  const response = await postAsync('/api/matching/update/report', {
    report_title: title,
    report_link: link,
    report_name: writer,
    report_content: content,
    num: matchingId,
  });
  return response;
}

/** 리포트 데이터 조회 */
export async function getReportDataAsync(matchingId: number): ApiResponse<any> {
  const response = await getAsync<any>(
    `/api/user/project/report/${matchingId}`,
  );
  return response;
}
