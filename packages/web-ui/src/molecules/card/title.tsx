import { Avatar, Box, Typography } from '../../atoms';

export function Title({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Box
      display="flex"
      p={1.5}
      gap={2}
      bgcolor={'#f5f5f5'}
      borderRadius={4}
      sx={{ alignItems: 'center' }}
    >
      <Box>{<Avatar sx={{ borderRadius: 3, width: 48, height: 48 }} />}</Box>
      <Box sx={{ flex: 'auto' }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h4">{subtitle}</Typography>
      </Box>
      {/* <Box ml={1}>
        <StyledIconButton size="small">
          <Add />
        </StyledIconButton>
      </Box> */}
    </Box>
  );
}
