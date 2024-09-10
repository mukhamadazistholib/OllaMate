import { ReactNode, useState } from 'react';
import Markdown from 'react-markdown';
import { Box, Button } from '@chakra-ui/react';

const Ul = ({ children }: { children: ReactNode }) => (
  <ul style={{ paddingLeft: '2rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>{children}</ul>
);
const P = ({ children }: { children: ReactNode }) => (
  <p style={{ paddingTop: 0, paddingBottom: '0.2rem', wordBreak: 'break-word' }}>{children}</p>
);
const Pre = ({ children }: { children: ReactNode }) => (
  <pre style={{ overflow: 'scroll', paddingLeft: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', margin: '1rem 0', background: '#D1D5DB', color: '#202123', borderRadius: '16px', maxWidth: '80vw' }}>{children}</pre>
);

const Code = ({ children }: { children: ReactNode }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    setCopied(true);
    console.log(children);
    navigator.clipboard.writeText(children as string);
  };

  const inline = (children?.length || 0) > 25;

  return (
    <>
      <code style={{
        color: '#202123',
        background: '#D1D5DB',
        paddingLeft: !inline ? '0.5rem' : 0,
        paddingRight: !inline ? '0.5rem' : 0,
        borderRadius: '6px'
      }}
      >
        {children}
      </code>
      {inline && (
      <Button
        background="#D1D5DB"
        color="#202123"
        marginTop="1rem"
        padding="0.5rem"
        size="sm"
        textDecoration="underline"
        textDecorationThickness="2px"
        textUnderlineOffset="2px"
        transform="translateX(-0.5rem)"
        variant="link"
        onClick={copyToClipboard}
      >
        {copied ? 'copied!' : 'copy to clipboard'}
      </Button>
      )}
    </>
  );
};

const A = ({ children, ...props }: { children: ReactNode }) => (
  <a {...props} style={{ color: '#D1D5DB', textDecoration: 'underline', padding: '2px 7px', borderRadius: '6px' }} target="_blank">{children}</a>
);

export const Message = ({ m = '', i = 0 }) => (
  <Box
    background={i % 2 !== 0 ? '#202123' : 'var(--active)'}
    border="2px"
    borderColor={i % 2 !== 0 ? '#D1D5DB' : '#D1D5DB'}
    borderRadius={8}
    className="chatMessage"
    color={i % 2 !== 0 ? '#D1D5DB' : '#D1D5DB'}
    fontSize="md"
    fontStyle="bold"
    fontWeight={600}
    maxWidth="calc(100% - 3rem)"
    ml={2}
    pb={1}
    pl={4}
    pr={4}
    pt={2}
    sx={{ textAlign: 'left' }}
  >
    <Markdown components={{ ul: Ul, ol: Ul, p: P, pre: Pre, code: Code, a: A }}>{m}</Markdown>
  </Box>
);
