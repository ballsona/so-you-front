import { NextApiRequest, NextApiResponse } from 'next';

export default function tokenHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body, cookies } = req;

  switch (method) {
    // 쿠키에서 토큰 값 요청
    case 'GET': {
      const { accessToken, refreshToken } = cookies;
      return res.status(200).json({
        code: 200,
        data: {
          accessToken,
          refreshToken,
        },
      });
    }

    // 쿠키에 토큰 값 저장
    case 'POST': {
      const { accessToken, refreshToken } = body;

      // 토큰 값이 없는 경우
      if (!accessToken || !refreshToken) {
        return res.status(400).json({
          code: 400,
          message: '토큰 값을 받지 못했어요',
        });
      }

      res.setHeader('Set-Cookie', [
        `accessToken=${accessToken}; path=/; Max-Age=2700;`, // TODO samesite=lax
        `refreshToken=${refreshToken}; path=/; Max-Age=86400;`,
      ]);
      return res.status(200).json({
        code: 200,
        message: '토큰 값을 성공적으로 저장했어요',
      });
    }

    // 쿠키에 있는 토큰 값 제거
    case 'DELETE': {
      res.setHeader('Set-Cookie', [
        `accessToken=null; path=/; Max-Age=0;`,
        `refreshToken=null; path=/; Max-Age=0;`,
      ]);
      return res.status(200).json({
        code: 200,
        message: '토큰 값을 성공적으로 제거했어요',
      });
    }
    default:
      return res.status(400).json({
        code: 400,
        message: '유효하지 않은 요청이에요',
      });
  }
}
