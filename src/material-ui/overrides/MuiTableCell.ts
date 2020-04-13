import palette from '../palette';
import {makeTypography} from '../typography';

export default {
  root: {
    ...(makeTypography(palette)).body1,
    borderBottom: `1px solid ${palette.divider}`,
  },
};
