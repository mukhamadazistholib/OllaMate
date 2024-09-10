import { ArrowRightIcon } from '@chakra-ui/icons';
import { IconButton, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const Send = ({ isLoading, onSend }: { isLoading: boolean, onSend: () => void }) => (
  <IconButton
    aria-label="Settings"
    as={motion.div}
    background="#202123"
    border="2px solid #D1D5DB"
    borderRadius={8}
    icon={
        isLoading ? (
          <Spinner color="#D1D5DB" speed="2s" />
        ) : (
          <ArrowRightIcon color="#D1D5DB" fontSize="md" marginLeft="2px" />
        )
      }
    ml={2}
    mr={2}
    zIndex={2}
    size="md"
    variant="outlined"
    whileHover={{ transform: !isLoading ? 'translateX(2px)' : undefined }}
    onClick={onSend}
  />
);
