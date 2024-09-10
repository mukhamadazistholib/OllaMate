import React from 'react';
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Grid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react';

import { useConfig } from './ConfigContext';
import { SettingTitle } from './SettingsTitle';

const WebSearchButton = ({ size, config }) => (
  <Button
    _hover={{
      background: 'var(--active)',
      border: '2px solid var(--active)'
    }}
    background="var(--active)"
    border="2px solid #D1D5DB"
    borderRadius={8}
    color="#D1D5DB"
    mb={1}
    ml={4}
    mt="2px"
    pl={4}
    pr={4}
    size="sm"
  >
    {size === 50 ? '' : `${size}k`}
  </Button>
);

const WebSearchModeSelector = ({ webMode, updateConfig }) => (
  <Grid width="50%">
    {['duckduckgo', 'brave'].map(mode => (
      <Grid
        alignItems="center"
        cursor="pointer"
        display="flex"
        key={mode}
        mb={4}
        onClick={() => updateConfig({ webMode: mode })}
      >
        <input
          checked={webMode === mode}
          style={{ fontSize: '1.5rem', borderColor: '#D1D5DB' }}
          type="checkbox"
        />
        <Text color="#D1D5DB" fontSize="lg" fontWeight={800} pl={2}>
          {mode}
        </Text>
      </Grid>
    ))}
  </Grid>
);

const WebSearchSlider = ({ size, updateConfig }) => (
  <Box width="45%">
    <Text
      color="#D1D5DB"
      fontSize="lg"
      fontWeight={800}
      ml={-4}
      pl={2}
      textAlign="left"
      pb={6}
    >
      char limit:
      {' '}
      {size === 50 ? 'inf' : `${size}k`}
    </Text>
    <Slider
      defaultValue={size}
      max={50}
      min={1}
      onChange={value => updateConfig({ webLimit: value })}
    >
      <SliderTrack background="#D1D5DB">
        <SliderFilledTrack background="#D1D5DB" />
      </SliderTrack>
      <SliderThumb background="#D1D5DB" style={{ zoom: 1.5 }} />
    </Slider>
  </Box>
);

export const WebSearch = () => {
  const { config, updateConfig } = useConfig();
  const size = config?.webLimit || 1;

  return (
    <AccordionItem border="2px solid #D1D5DB" borderRadius={8} mb={4}>
      <AccordionButton
        _hover={{ backgroundColor: 'transparent' }}
        pb={1}
        pr={2}
      >
        <SettingTitle
          icon="🌐"
          padding={0}
          text="Web search"
          widget={(
            <Grid alignItems="center" display="flex">
              {config?.host && <WebSearchButton config={config} size={size} />}
            </Grid>
          )}
        />
      </AccordionButton>
      <AccordionPanel p={4} pt={2}>
        <Grid display="flex">
          <WebSearchModeSelector webMode={config?.webMode} updateConfig={updateConfig} />
          <WebSearchSlider size={size} updateConfig={updateConfig} />
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
};
