import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure
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

const SaveButtons = ({ hasChange, buttonColor, onSave, onSaveAs, onCancel }) => {
  const commonButtonStyles = {
    _hover: { background: 'var(--active)', border: `2px solid ${buttonColor}` },
    background: 'var(--active)',
    border: `2px solid ${buttonColor}`,
    borderRadius: 16,
    color: buttonColor,
    size: 'sm',
    mr: 2
  };

  return (
    <Box display="flex" mt={2}>
      {hasChange && (
        <>
          <Button {...commonButtonStyles} borderRadius={8} disabled={!hasChange} onClick={onSave}>
            Save
          </Button>
          <Button {...commonButtonStyles} borderRadius={8} disabled={!hasChange} onClick={onSaveAs}>
            Save as
          </Button>
          <Button
            _hover={{ background: 'var(--active)', border: '2px solid #D1D5DB' }}
            background="#202123"
            border="2px solid #D1D5DB"
            borderRadius={8}
            color="#D1D5DB"
            mr={2}
            size="sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </>
      )}
    </Box>
  );
};

const PersonaModal = ({ isOpen, onClose, personaPrompt, personas, updateConfig }) => {
  const [name, setName] = useState('');
  const buttonColor = name ? '#D1D5DB' : 'gray';

  const handleCreate = () => {
    if (!name) return;
    updateConfig({
      personas: { ...personas, [name]: personaPrompt },
      persona: name
    });

    setName('');
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} size="xs" onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="var(--active)" borderRadius={8}>
        <ModalHeader color="#D1D5DB" padding={2} paddingLeft={6}>
          Create new persona
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody padding={4}>
          <Input
            _focus={{ borderColor: '#D1D5DB', boxShadow: 'none !important' }}
            _hover={{ borderColor: '#D1D5DB', boxShadow: 'none !important' }}
            background="#202123"
            border="2px"
            borderColor="#D1D5DB"
            borderRadius={8}
            color="#D1D5DB"
            fontSize="md"
            fontStyle="bold"
            fontWeight={600}
            mr={4}
            placeholder="name"
            size="md"
            value={name}
            variant="outline"
            onChange={e => setName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter justifyContent="center" pt={0}>
          <Button
            _hover={{ background: '#202123', border: `2px solid ${buttonColor}` }}
            background="#202123"
            border={`2px solid ${buttonColor}`}
            borderRadius={8}
            color={buttonColor}
            disabled={!name}
            mr={2}
            size="sm"
            onClick={handleCreate}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const DeleteModal = ({ isOpen, onClose, persona, personas, updateConfig }) => {
  const handleDelete = () => {
    const newPersonas = { ...personas };
    delete newPersonas[persona];
    updateConfig({
      personas: newPersonas,
      persona: Object.keys(newPersonas)[0]
    });

    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} size="xs" onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="var(--active)" borderRadius={8}>
        <ModalHeader padding={2} paddingLeft={6}>
          Delete
          {' '}
          {persona}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody padding={2} />
        <ModalFooter justifyContent="center" pt={0}>
          <Button
            _hover={{ background: '#202123', border: '2px solid #D1D5DB' }}
            background="#202123"
            border="2px solid #D1D5DB"
            borderRadius={8}
            color="#D1D5DB"
            mr={2}
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const PersonaSelect = ({ personas, persona, updateConfig }) => (
  <Select
    _focus={{ borderColor: '#D1D5DB', boxShadow: 'none !important' }}
    _hover={{ borderColor: '#D1D5DB', boxShadow: 'none !important' }}
    border="2px"
    borderColor="#D1D5DB"
    borderRadius={8}
    color="#D1D5DB"
    defaultValue="default"
    fontSize="md"
    fontStyle="bold"
    fontWeight={600}
    maxWidth="50%"
    mb={2}
    ml={1}
    size="sm"
    value={persona}
    onChange={e => updateConfig({ persona: e.target.value })}
  >
    {Object.keys(personas).map(p => (
      <option key={p} value={p}>{p}</option>
    ))}
  </Select>
);

const PersonaTextarea = ({ personaPrompt, setPersonaPrompt }) => (
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
    value={personaPrompt}
    onChange={e => setPersonaPrompt(e.target.value)}
  />
);

const SaveButtonsWrapper = ({ buttonColor, hasChange, defaultPrompt, setPersonaPrompt, updateConfig, personas, persona, onOpen, personaPrompt }) => (
  <SaveButtons
    buttonColor={buttonColor}
    hasChange={hasChange}
    onCancel={() => setPersonaPrompt(defaultPrompt)}
    onSave={() => updateConfig({ personas: { ...personas, [persona]: personaPrompt } })}
    onSaveAs={onOpen}
  />
);

const PersonaModalWrapper = ({ isOpen, personaPrompt, personas, updateConfig, onClose }) => (
  <PersonaModal
    isOpen={isOpen}
    personaPrompt={personaPrompt}
    personas={personas}
    updateConfig={updateConfig}
    onClose={onClose}
  />
);

const DeleteModalWrapper = ({ isDeleteOpen, persona, personas, updateConfig, onDeleteClose }) => (
  <DeleteModal
    isOpen={isDeleteOpen}
    persona={persona}
    personas={personas}
    updateConfig={updateConfig}
    onClose={onDeleteClose}
  />
);

const Persona = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [name, setName] = useState('');
  const { config, updateConfig } = useConfig();
  const personas = config?.personas || {};
  const persona = config?.persona || 'OllaMate';

  const defaultPrompt = personas?.[persona] || personas?.OllaMate;
  const [personaPrompt, setPersonaPrompt] = useState(defaultPrompt);
  const hasChange = personaPrompt !== defaultPrompt;

  useEffect(() => {
    if (defaultPrompt !== personaPrompt) {
      setPersonaPrompt(defaultPrompt);
    }
  }, [defaultPrompt]);

  const buttonColor = hasChange ? '#D1D5DB' : 'gray';

  return (
    <AccordionItem
      border="2px solid #D1D5DB"
      borderBottomWidth="2px !important"
      borderRadius={8}
      mb={4}
    >
      <AccordionButton _hover={{ backgroundColor: 'transparent' }} paddingBottom={1} paddingRight={2}>
        <SettingTitle
          icon="👤"
          padding={0}
          text="Persona"
        />
      </AccordionButton>
      <AccordionPanel p={2} pt={2}>
        <Box display="flex" flexWrap="wrap">
          <PersonaSelect persona={persona} personas={personas} updateConfig={updateConfig} />
          {Object.keys(personas).length > 1 && (
            <IconButton
              aria-label="delete"
              borderRadius={8}
              icon={<DeleteIcon color="#D1D5DB" fontSize="xl" />}
              pb={2}
              variant="outlined"
              onClick={onDeleteOpen}
            />
          )}
          <IconButton
            aria-label="delete"
            borderRadius={8}
            icon={<AddIcon color="#D1D5DB" fontSize="xl" />}
            pb={2}
            variant="outlined"
            onClick={() => {
              setPersonaPrompt('');
              onOpen();
            }}
          />
          <PersonaTextarea personaPrompt={personaPrompt} setPersonaPrompt={setPersonaPrompt} />
          <SaveButtonsWrapper
            buttonColor={buttonColor}
            defaultPrompt={defaultPrompt}
            hasChange={hasChange}
            persona={persona}
            personaPrompt={personaPrompt}
            personas={personas}
            setPersonaPrompt={setPersonaPrompt}
            updateConfig={updateConfig}
            onOpen={onOpen}
          />
        </Box>
      </AccordionPanel>
      <PersonaModalWrapper
        isOpen={isOpen}
        personaPrompt={personaPrompt}
        personas={personas}
        updateConfig={updateConfig}
        onClose={onClose}
      />
      <DeleteModalWrapper
        isDeleteOpen={isDeleteOpen}
        persona={persona}
        personas={personas}
        updateConfig={updateConfig}
        onDeleteClose={onDeleteClose}
      />
    </AccordionItem>
  );
};

export { AutoResizeTextarea, Persona };
