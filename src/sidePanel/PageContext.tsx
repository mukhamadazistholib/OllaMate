
import React from 'react';
import { AccordionButton, AccordionItem, AccordionPanel, Button, Grid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';

import { useConfig } from './ConfigContext';
import { SettingTitle } from './SettingsTitle';

export const PageContext = () => {
  const { config, updateConfig } = useConfig();
  const isTextMode = !config?.pageMode || config?.pageMode === 'text';
  const size = config?.contextLimit || 1;
  return (
    <AccordionItem
      border="2px solid #D1D5DB"
      borderBottomWidth="2px !important"
      borderRadius={8}
      mb={4}
    >
      <AccordionButton _hover={{ backgroundColor: 'transparent' }} paddingBottom={1} paddingRight={2}>
        <SettingTitle
          icon="📜"
          padding={0}
          text="Page context"
          widget={(
            <Grid alignItems="center" display="flex">
              {config?.host
                && (
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
                    {isTextMode ? 'text' : 'html'}
                    {' '}
                    {size === 50 ? '' : `${size}k`}
                  </Button>
                )}
            </Grid>
          )}
        />
      </AccordionButton>
      <AccordionPanel p={4} pt={2}>
        <Grid display="flex">
          <Grid width="50%">
            <Grid alignItems="center" cursor="pointer" display="flex" marginBottom={4} onClick={() => updateConfig({ pageMode: 'text' })}>
              <input checked={isTextMode} style={{ fontSize: '1.5rem', borderColor: '#D1D5DB' }} type="checkbox" />
              <Text color="#D1D5DB" fontSize="lg" fontWeight={800} pl={2}>Text mode</Text>
            </Grid>
            <Grid alignItems="center" cursor="pointer" display="flex" onClick={() => updateConfig({ pageMode: 'html' })}>
              <input checked={!isTextMode} style={{ fontSize: '1.5rem', borderColor: '#D1D5DB' }} type="checkbox" />
              <Text color="#D1D5DB" fontSize="lg" fontWeight={800} pl={2}>Html mode</Text>
            </Grid>
          </Grid>
          <Grid width="45%">
            <Text color="#D1D5DB" fontSize="lg" fontWeight={800} marginLeft={-4} pl={2} textAlign="left">
              Char limit:
              {' '}
              {size === 50 ? 'inf' : `${size}k`}
            </Text>
            <Slider
              defaultValue={size}
              id="slider"
              max={50}
              min={1}
              onChange={e => updateConfig({ contextLimit: e })}
            >
              <SliderTrack background="#D1D5DB">
                <SliderFilledTrack background="#D1D5DB" />
              </SliderTrack>
              <SliderThumb background="#D1D5DB" style={{ zoom: 1.5 }} />
            </Slider>
          </Grid>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
};
