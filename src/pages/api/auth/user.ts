import { UserType } from '@/types/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, cookies } = req;

  switch (method) {
    case 'GET': {
      const { userType } = cookies;
      return res.status(200).json({
        code: 200,
        data: { userType: userType as UserType },
      });
    }
    case 'POST': {
      const { userType } = body;

      if (!userType) {
        return res.status(400).json({
          code: 400,
          message: '유저 정보를 올바르게 받지 못했어요',
        });
      }

      res.setHeader('Set-Cookie', [
        `userType=${userType}; path=/; Max-Age=2700; HttpOnly; Secure; Samesite=lax`,
      ]);
      return res.status(200).json({
        code: 200,
        message: '유저 타입 정보를 올바르게 저장했어요',
      });
    }
    case 'DELETE': {
      res.setHeader('Set-Cookie', 'userType=null; path=/; Max-Age=0;');
      return res.status(200).json({
        code: 200,
        message: '유저 정보를 성공적으로 제거했어요',
      });
    }
    default:
      return res.status(400).json({
        code: 400,
        message: '유효하지 않은 요청이에요',
      });
  }
}
