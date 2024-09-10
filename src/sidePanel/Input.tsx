import React, { ForwardedRef, useEffect, useRef } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import { Textarea } from '@chakra-ui/react';

import { useConfig } from './ConfigContext';

export const AutoResizeTextarea = React.forwardRef((props, ref) => (
  <Textarea
    as={ResizeTextarea}
    maxRows={8}
    minH="unset"
    minRows={1}
    overflow="scroll"
    ref={ref as ForwardedRef<HTMLTextAreaElement>}
    resize="none"
    w="100%"
    {...props}
  />
));

export const Input = ({
  message,
  setMessage,
  isLoading, onSend
}: {
  message: string,
  setMessage: (m: string) => void,
  isLoading: boolean,
  onSend: () => void
}) => {
  const { config } = useConfig();
  const ref = useRef(null);
  useEffect(() => {
    // @ts-ignore
    ref?.current?.focus();
  }, [message, config?.chatMode]);

  const { config } = useConfig();

  const placeholder = config?.chatMode === 'web' ? 'what to search?' : config?.chatMode === 'page' ? 'Message Ollamate..' : '';

  return (
    <AutoResizeTextarea
      autoFocus
      _focus={{
        borderColor: '#D1D5DB',
        boxShadow: 'none !important'
      }}
      _hover={{
        borderColor: '#D1D5DB',
        boxShadow: 'none !important'
      }}
      autoComplete="off"
      background="#202123"
      border="2px"
      borderColor="#D1D5DB"
      borderRadius={8}
      color="#D1D5DB"
      fontSize="md"
      fontStyle="bold"
      fontWeight={600}
      id="user-input"
      ml={2}
      placeholder={placeholder}
      pr={12}
      ref={ref}
      size="sm"
      value={message}
      onChange={event => setMessage(event.target.value)}
      onKeyDown={event => {
        if (isLoading) return;
        if (event.keyCode === 13 && message && !event.altKey && !event.metaKey && !event.shiftKey) {
          event.preventDefault();
          event.stopPropagation();
          onSend();
          setMessage('');
        }
      }}
    />
  );
};
