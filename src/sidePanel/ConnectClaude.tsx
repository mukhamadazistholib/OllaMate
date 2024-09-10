import React from 'react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Input } from '@chakra-ui/react';

import { useConfig } from './ConfigContext';
import { GROQ_URL } from './constants';

export const ConnectClaude = () => {
  const { config } = useConfig();
  const [apiKey, setApiKey] = useState(config?.groqApiKey);
  const [visibleApiKeys, setVisibleApiKeys] = useState(false);
  
  const onConnect = () => {
    return;
  };

  const disabled = config?.groqApiKey === apiKey;
  const isConnected = config?.groqConnected && config?.groqApiKey === apiKey && false;

  return (
    <Box display="flex" mb={4} ml={4} mr={4}>
      <Input
        _focus={{
          borderColor: '#D1D5DB',
          boxShadow: 'none !important'
        }}
        _hover={{
          borderColor: !disabled && '#D1D5DB',
          boxShadow: !disabled && 'none !important'
        }}
        autoComplete="off"
        border="2px"
        borderColor="#D1D5DB"
        borderRadius={8}
        color="#D1D5DB"
        fontSize="md"
        fontStyle="bold"
        fontWeight={600}
        id="user-input"
        mr={4}
        placeholder="coming soon!"
        disabled
        size="sm"
        type={!visibleApiKeys ? 'password' : undefined}
        value={""}
        variant="outline"
        onChange={e => setApiKey(e.target.value)}
      />
      {!isConnected && (
      <Button
        _hover={{
          background: 'var(--active)',
          border: '2px solid #D1D5DB'
        }}
        background="var(--active)"
        border="2px solid #D1D5DB"
        borderRadius={8}
        color="#D1D5DB"
        disabled
        size="sm"
        onClick={onConnect}
      >
        Connect
      </Button>
      )}
      {isConnected && (
      <IconButton
        isRound
        _hover={{
          background: 'var(--active)',
          border: '2px solid #D1D5DB'
        }}
        aria-label="Done"
        background="var(--active)"
        border="2px solid #D1D5DB"
        color="#D1D5DB"
        fontSize="19px"
        icon={visibleApiKeys ? <ViewOffIcon /> : <ViewIcon />}
        size="sm"
        variant="solid"
        onClick={() => setVisibleApiKeys(!visibleApiKeys)}
      />
      )}

    </Box>
  );
};
