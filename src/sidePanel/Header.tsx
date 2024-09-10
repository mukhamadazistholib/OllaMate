/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  DeleteIcon,
  SettingsIcon,
  SmallCloseIcon
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { useConfig } from './ConfigContext';

// eslint-disable-next-line react/prop-types
const WelcomeModal = ({ isOpen, onClose, setSettingsMode }) => (
  <Modal isCentered isOpen={isOpen} scrollBehavior="inside" size="sm" onClose={onClose}>
    <ModalOverlay />
    <ModalContent bg="#202123" border="2px solid #D1D5DB" borderRadius={8} color="#D1D5DB" pb={2}>
      <ModalHeader textAlign="center">Welcome to OllaMate!</ModalHeader>
        <Text color="#D1D5DB" fontSize="md" fontWeight={600} textAlign="center">
          Your personal AI chatbot.
        </Text>
      <ModalBody>
        <Box display="flex" justifyContent="center" mt={6}>
          <Button
            _hover={{ background: 'var(--active)', border: '2px solid #D1D5DB' }}
            background="var(--active)"
            border="2px solid #D1D5DB"
            borderRadius={8}
            color="#D1D5DB"
            mr={2}
            size="md"
            onClick={() => setSettingsMode(true)}
          >
            Connect
          </Button>
        </Box>
      </ModalBody>
    </ModalContent>
  </Modal>
);

// eslint-disable-next-line react/prop-types
const Badge = ({ children }) => (
  <Box
    background="#202123"
    border="2px"
    borderColor="#D1D5DB"
    borderRadius={8}
    color="#D1D5DB"
    defaultValue="default"
    fontSize="md"
    fontStyle="bold"
    fontWeight={600}
    overflow="hidden"
    pb={0.5}
    pl={3}
    pr={3}
    pt={0.5}
    textOverflow="ellipsis"
    whiteSpace="nowrap"
  >
    {children}
  </Box>
);

// eslint-disable-next-line react/prop-types
const DrawerHeader = ({ onClose }) => (
  <Box alignItems="center" background="var(--active)" borderBottom="2px solid #D1D5DB" display="flex" paddingBottom={2} paddingTop={2}>
    <IconButton
      aria-label="Close Drawer"
      as={motion.div}
      borderRadius={8}
      icon={<SmallCloseIcon color="#D1D5DB" fontSize="3xl" />}
      ml={1}
      mr={1}
      variant="outlined"
      whileHover={{ cursor: 'pointer' }}
      onClick={onClose}
    />
    <Badge>Settings</Badge>
  </Box>
);

// eslint-disable-next-line react/prop-types
const DrawerSection = ({ title, children }) => (
  <Box borderBottom="2px solid #D1D5DB" p={2} pb={4}>
    <Text color="#D1D5DB" fontSize="xl" fontWeight={600} mb={2}>{title}</Text>
    {children}
  </Box>
);

// eslint-disable-next-line react/prop-types
const DrawerLinkSection = ({ title, onClick }) => (
  <Box _hover={{ background: 'var(--active)' }} borderBottom="2px solid #D1D5DB">
    <Text
      color="#D1D5DB"
      cursor="pointer"
      fontSize="xl"
      fontWeight={600}
      p={2}
      onClick={onClick}
    >
      {title}
    </Text>
  </Box>
);

// eslint-disable-next-line react/prop-types
const SettingsDrawer = ({ isOpen, onClose, config, updateConfig, availableModelNames, setSettingsMode, downloadText, downloadJson, downloadImage, setHistoryMode }) => (
  <Drawer isOpen={isOpen} placement="left" size="xs" onClose={onClose}>
    <DrawerOverlay />
    <DrawerContent background="#202123" borderRadius={8} borderRight="2px solid #D1D5DB" overflow="hidden" padding={0}>
      <DrawerBody padding={0}>
        <DrawerHeader onClose={onClose} />
        <DrawerSection title="Persona">
          <Select
            _focus={{ borderColor: '#D1D5DB', boxShadow: 'none !important', background: 'transparent' }}
            _hover={{ borderColor: '#D1D5DB', boxShadow: 'none !important', background: 'var(--active)' }}
            background="transparent"
            border="2px"
            borderColor="#D1D5DB"
            borderRadius={8}
            color="#D1D5DB"
            defaultValue="default"
            fontSize="md"
            fontWeight={600}
            overflow="hidden"
            size="sm"
            value={config?.persona}
            whiteSpace="nowrap"
            onChange={e => updateConfig({ persona: e.target.value })}
          >
            {Object.keys(config.personas || {}).map(p => <option key={p} value={p}>{p}</option>)}
          </Select>
        </DrawerSection>
        <DrawerSection title="Model">
          <Select
            _focus={{ borderColor: '#D1D5DB', boxShadow: 'none !important', background: 'transparent' }}
            _hover={{ borderColor: '#D1D5DB', boxShadow: 'none !important', background: 'var(--active)' }}
            background="transparent"
            border="2px"
            borderColor="#D1D5DB"
            borderRadius={8}
            color="#D1D5DB"
            defaultValue="default"
            fontSize="md"
            fontWeight={600}
            overflow="hidden"
            size="sm"
            value={config?.selectedModel || ''}
            whiteSpace="nowrap"
            onChange={e => updateConfig({ selectedModel: e.target.value })}
          >
            {!availableModelNames && <option disabled value="default">Loading models...</option>}
            {availableModelNames?.map((m: string) => {
              const currentModel = config?.models?.find(({ id }: any) => id === m);
              const disabled = currentModel?.active === false;
              return (
                <option disabled={disabled} key={m} value={m}>
                  {currentModel?.host ? `(${currentModel.host}) ${m}` : m}
                </option>
              );
            })}
          </Select>
        </DrawerSection>
        <DrawerLinkSection title="Configuration" onClick={() => { setSettingsMode(true); onClose(); }} />
        <DrawerLinkSection
          title="Chat history"
          onClick={() => { setHistoryMode(true); onClose(); }}
        />
        <DrawerLinkSection
          title="Export chat (text)"
          onClick={() => { onClose(); downloadText(); }}
        />
        <DrawerLinkSection
          title="Export chat (json)"
          onClick={() => { onClose(); downloadJson(); }}
        />
        <DrawerLinkSection
          title="Export chat (image)"
          onClick={() => { downloadImage(); onClose(); }}
        />
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);

export const Header = ({
  chatTitle = '',
  reset = () => {},
  downloadText = () => {},
  downloadJson = () => {},
  downloadImage = () => {},
  settingsMode = false,
  setSettingsMode = _s => {},
  historyMode = false,
  setHistoryMode = _s => {}
}) => {
  const { config, updateConfig } = useConfig();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const availableModelNames = config?.models?.map(({ id }) => id);

  const visibleTitle = chatTitle && !settingsMode && !historyMode;

  return (
    <Box
      background="var(--active)"
      pb={0}
      pt={2}
      textAlign="left"
      zIndex={3}
    >
      <Box
        alignItems="center"
        borderBottom="2px solid #D1D5DB"
        display="flex"
        justifyContent="space-between"
        pb={2}
      >
        {(!config?.models || config?.models.length === 0) && !settingsMode && (
          <WelcomeModal isOpen={!settingsMode} setSettingsMode={setSettingsMode} onClose={() => {}} />
        )}
        <Box alignItems="center" display="flex" flexGrow={1} overflow="hidden" width="80%">
          <Box style={{ cursor: 'pointer' }}>
            {!settingsMode && !historyMode ? (
              <IconButton
                aria-label="Settings"
                as={motion.div}
                borderRadius={8}
                icon={<SettingsIcon color="#D1D5DB" fontSize="xl" />}
                ml={1}
                mr={1}
                variant="outlined"
                whileHover={{ rotate: '90deg', cursor: 'pointer' }}
                onClick={onOpen}
              />
            ) : (
              <IconButton
                aria-label="Close"
                as={motion.div}
                borderRadius={8}
                icon={<SmallCloseIcon color="#D1D5DB" fontSize="3xl" />}
                ml={1}
                mr={1}
                variant="outlined"
                whileHover={{ cursor: 'pointer' }}
                onClick={() => {
                  setSettingsMode(false);
                  setHistoryMode(false);
                }}
              />
            )}
          </Box>
          {visibleTitle && <Badge>{chatTitle}</Badge>}
          {!visibleTitle && !historyMode && !settingsMode && (
          <Badge>
            {' '}
            {config?.persona || ''}
            {' '}
            @
            {' '}
            {config?.selectedModel || ''}
          </Badge>
          )}
          {historyMode && <Badge>chat history</Badge>}
        </Box>
        {!settingsMode && !historyMode && (
          <IconButton
            aria-label="Reset"
            as={motion.div}
            borderRadius={8}
            icon={<DeleteIcon color="#D1D5DB" fontSize="xl" />}
            variant="outlined"
            whileHover={{ rotate: '15deg', cursor: 'pointer' }}
            onClick={reset}
          />
        )}
      </Box>
      <SettingsDrawer
        availableModelNames={availableModelNames}
        config={config}
        downloadImage={downloadImage}
        downloadJson={downloadJson}
        downloadText={downloadText}
        isOpen={isOpen}
        setHistoryMode={setHistoryMode}
        setSettingsMode={setSettingsMode}
        updateConfig={updateConfig}
        onClose={onClose}
      />
    </Box>
  );
};
