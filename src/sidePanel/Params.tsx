
import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import {
  AccordionButton, AccordionItem, AccordionPanel, Box,
  Text,
  Textarea
} from '@chakra-ui/react';

import { useConfig } from './ConfigContext';
import { SettingTitle } from './SettingsTitle';

const AutoResizeTextarea = forwardRef((props, ref) => (
  <Textarea
    as={ResizeTextarea}
    maxRows={8}
    minH="unset"
    minRows={3}
    overflow="scroll"
    ref={ref as ForwardedRef<HTMLTextAreaElement>}
    resize="none"
    w="100%"
    {...props}
  />
));

const ParamsTextArea = ({ params, setParams }) => (
  <AutoResizeTextarea

    // @ts-ignore
    // eslint-disable-next-line react/jsx-props-no-multi-spaces
    _focus={{ borderColor: '#D1D5DB', boxShadow: 'none !important' }}
    _hover={{ borderColor: '#D1D5DB', boxShadow: 'none !important' }}
    background="#D1D5DB"
    border="2px"
    borderColor="#D1D5DB"
    borderRadius={8}
    boxShadow="none !important"
    color="#202123"
    fontSize="md"
    fontStyle="bold"
    fontWeight={600}
    value={params}
    onChange={e => setParams(e.target.value)}
  />
);

export const Params = () => {
  const { config, updateConfig } = useConfig();
  const [isValid, setValid] = useState(true);
  const [params, setParams] = useState(JSON.stringify(config?.params || { temperature: 1 }, null, 2));

  useEffect(() => {
    try {
      const paramsObj = JSON.parse(params);
      updateConfig({ params: paramsObj });
      setValid(true);
    } catch {
      setValid(false);
    }
  }, [params]);

  return (
    <AccordionItem
      border="2px solid #D1D5DB"
      borderBottomWidth="2px !important"
      borderRadius={8}
      mb={4}
    >
      <AccordionButton _hover={{ backgroundColor: 'transparent' }} paddingBottom={1} paddingRight={2}>
        <SettingTitle
          icon="🧮"
          padding={0}
          text="params"
        />
      </AccordionButton>
      <AccordionPanel p={2} pt={0}>
      <Text color="#D1D5DB" fontSize="md" fontWeight={800} p={2} pt={0} textAlign="left">
          🚧 under construction 🚧
        </Text>
        <Text color="#D1D5DB" fontSize="md" fontWeight={800} p={2} pt={0} textAlign="left">
          {isValid ? 'saved' : 'invalid JSON'}
          !
        </Text>
        <Box display="flex" flexWrap="wrap">
          <ParamsTextArea params={params} setParams={setParams} />
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};
