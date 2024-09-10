import { AttachmentIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { useConfig } from './ConfigContext';

export const AddToChat = () => {
  const { config, updateConfig } = useConfig();
  return (
    <Menu>
      <MenuButton
        aria-label="Settings"
        as={Button}
        background="#202123"
        border="2px solid #D1D5DB"
        borderRadius={8}
        fontSize="md"
        fontWeight={800}
        m={0}
        ml={2}
        padding={config?.chatMode ? 2 : 0}
        paddingLeft={config?.chatMode ? 2 : 0}
        paddingRight={config?.chatMode ? 5 : '1px'}
        rightIcon={!config?.chatMode ? <AttachmentIcon color="#D1D5DB" fontSize="xl" marginRight="5px" /> : undefined}
        size="md"
        variant="outlined"
        color="#D1D5DB"
        zIndex={2}
      >
        {config?.chatMode}
      </MenuButton>
      <MenuList
        background="var(--active)"
        borderBottom="2px solid #D1D5DB"
        borderLeft="2px solid #D1D5DB"
        borderRight="2px solid #D1D5DB"
        borderTop="2px solid #D1D5DB"
        marginTop="1px"
        minWidth="110px"
        zIndex={4}
        p={0}
        style={{ right: '-5.1rem', bottom: '0.25rem', position: 'absolute' }}
      >
        <MenuItem
          _hover={{ background: '#202123' }}
          background={!config?.chatMode ? '#202123' : '#202123'}
          borderBottom="2px solid #D1D5DB"
          color="#D1D5DB"
          fontSize="md"
          fontWeight={800}
          onClick={() => updateConfig({ chatMode: undefined })}
        >
          Chat
        </MenuItem>
        <MenuItem
          _hover={{ background: '#202123' }}
          background={config?.chatMode === 'page' ? '#202123' : '#202123'}
          borderBottom="2px solid #D1D5DB"
          color="#D1D5DB"
          fontSize="md"
          fontWeight={800}
          onClick={() => updateConfig({ chatMode: 'page' })}
        >
          Page chat
        </MenuItem>
        <MenuItem
          _hover={{ background: '#202123' }}
          background={config?.chatMode === 'web' ? '#202123' : '#202123'}
          color="#D1D5DB"
          fontSize="md"
          fontWeight={800}
          onClick={() => updateConfig({ chatMode: 'web' })}
        >
          Web chat
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
