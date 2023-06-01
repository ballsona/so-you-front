import { MutableRefObject, useEffect, useRef } from 'react';

export function useMessageRefs() {
  // [이메일, 비밀번호, 비밀번호 확인, 생년월일,  예상광고비]
  const messageRefs = useRef([]) as MutableRefObject<HTMLParagraphElement[]>;

  const setMessage = (index: number, text: string) => {
    messageRefs.current.forEach((node) => {
      node.innerText = '';
    });
    messageRefs.current[index].innerText = text;
  };

  return { messageRefs, setMessage };
}
