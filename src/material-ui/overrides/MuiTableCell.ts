import {makeTypography} from '../typography';

export default (palette: any) => ({
  root: {
    ...(makeTypography(palette)).body1,
    borderBottom: `1px solid ${palette.divider}`,
  },
});
