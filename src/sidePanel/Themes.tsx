import React from 'react';
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip
} from '@chakra-ui/react';

import { useConfig } from './ConfigContext';
import { SettingTitle } from './SettingsTitle';

type Theme = {
  name: string;
  active: string;
  bg: string;
  text: string;
}

export const themes = [
  { name: 'stone', active: 'black', bg: '#212529', text: '#fff6a5' },
  { name: 'mist', active: '#F0F0F0', bg: '#FFFFFF', text: 'black' },  
];

export const setTheme = (c: Theme) => {
  localStorage.setItem('theme', c.name);
  document.documentElement.style.setProperty('--active', c.active);
  document.documentElement.style.setProperty('--bg', c.bg);
  document.documentElement.style.setProperty('--text', c.text);
};

const ThemeButton = ({ theme, updateConfig }: { theme: Theme, updateConfig: Function }) => (
  <Tooltip aria-label={theme.name} background="#202123" color="#D1D5DB" label={theme.name}>
    <Button
      _hover={{
        background: theme.active,
        border: '3px solid #D1D5DB',
        boxShadow: '3px'
      }}
      background={theme.active}
      border="2px solid #D1D5DB"
      borderRadius={8}
      color="#D1D5DB"
      mb={2}
      mr={2}
      size="md"
      onClick={() => {
        updateConfig(theme.name);
        setTheme(theme);
      }}
    />
  </Tooltip>

);

export const Themes = () => {
  const { config, updateConfig } = useConfig();
  const currentFontSize = config?.fontSize || 12;

  return (
    <AccordionItem border="2px solid #D1D5DB" borderRadius={8} mb={4} mt={0}>
      <AccordionButton _hover={{ backgroundColor: 'transparent' }} paddingBottom={1} paddingRight={2}>
        <SettingTitle icon="🎨" padding={0} text="General" />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Box>
          <Text onClick={() => updateConfig({ generateTitle: !config?.generateTitle })} alignItems="center" color="#D1D5DB" display="flex" fontSize="lg" fontWeight={800} pb={2} textAlign="left" cursor="pointer">
          <input checked={config?.generateTitle} style={{ marginRight: '0.5rem' }} type="checkbox" onChange={() => updateConfig({ generateTitle: !config?.generateTitle })} />
            Create chat title
          </Text>
          <Text onClick={() => updateConfig({ backgroundImage: !config?.backgroundImage })}  alignItems="center" color="#D1D5DB" display="flex" fontSize="lg" fontWeight={800} pb={2} textAlign="left" cursor="pointer">
          <input checked={config?.backgroundImage} style={{ marginRight: '0.5rem' }} type="checkbox" onChange={() => updateConfig({ backgroundImage: !config?.backgroundImage })} />
            Background illustration
          </Text>
          <Text color="#D1D5DB" fontSize="lg" fontWeight={800} pb={2} pt={2} textAlign="left">
            font size
            <Slider
              defaultValue={currentFontSize}
              id="slider"
              max={20}
              min={7}
              onChange={e => {
                updateConfig({ fontSize: e });
              }}
            >
              <SliderTrack background="#D1D5DB">
                <SliderFilledTrack background="#D1D5DB" />
              </SliderTrack>
              <SliderThumb background="#D1D5DB" style={{ zoom: 1.5 }} />
            </Slider>
          </Text>
        </Box>
        <Box>
          <Text color="#D1D5DB" fontSize="lg" fontWeight={800} pb={2} textAlign="left">Theme</Text>
          <Box display="flex" flexWrap="wrap">
            {themes.map((theme, index) => (
              <ThemeButton key={theme.name} theme={theme} updateConfig={updateConfig} />
            ))}
          </Box>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};
