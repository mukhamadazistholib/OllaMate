import React from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { AccordionButton, AccordionItem, AccordionPanel, Link, Text } from '@chakra-ui/react';
import { ConnectGroq } from './ConnectGroq';
import { ConnectOllama } from './ConnectOllama';
import { SettingTitle } from './SettingsTitle';
import { ConnectClaude } from './ConnectClaude';
import { ConnectLmStudio } from './ConnectLmStudio';
import { ConnectOpenAI } from './ConnectOpenAI';

type ConnectionProps = {
  title: string;
  Component: React.FC<any>;
  link?: string;
};

const borderStyle: string = '2px solid #D1D5DB';
const textStyle = {
  fontWeight: 800,
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 4,
  fontSize: 'lg',
  color: '#D1D5DB'
};

const ConnectionSection: React.FC<ConnectionProps> = ({ title, Component, link }) => (
  <>
    <Text textAlign="left" {...textStyle}>
      {title}
      {' '}
      {link && (
      <Link isExternal fontSize="sm" color="#D1D5DB" ml="0.5rem" href={link}>
        api keys
        {' '}
        <ExternalLinkIcon mx="2px" />
      </Link>
      )}
    </Text>
    <Component />
  </>
);

export const Connect: React.FC = () => (
  <AccordionItem border={borderStyle} borderRadius={8} mb={4} mt={2}>
    <AccordionButton _hover={{ backgroundColor: 'transparent' }} paddingBottom={1} paddingRight={2}>
      <SettingTitle icon="🔗" padding={0} text="Connections" />
    </AccordionButton>
    <AccordionPanel p={0}>
      <ConnectionSection Component={ConnectOllama} title="ollama" />
      <ConnectionSection Component={ConnectLmStudio} title="lm studio" />
      <ConnectionSection Component={ConnectGroq} title="groq" link="https://console.groq.com/keys" />
      {/* <ConnectionSection Component={ConnectClaude} title="claude" link="https://console.anthropic.com/settings/keys" /> */}
      {/* <ConnectionSection Component={ConnectOpenAI} title="openai" link="https://platform.openai.com/api-keys" /> */}
    </AccordionPanel>
  </AccordionItem>
);
