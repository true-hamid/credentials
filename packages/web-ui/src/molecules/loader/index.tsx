import Portal from '@mui/material/Portal';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '../../atoms';

export const Loader = ({ visible = false }: { visible: boolean }) => {
  return visible ? (
    <Portal>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    </Portal>
  ) : null;
};
