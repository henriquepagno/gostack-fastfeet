import styled from 'styled-components';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

export const StyledDialogTitle = styled(DialogTitle)`
  && {
    h2 {
      font: 16px 'Roboto', sans-serif;
      font-weight: bold;
      letter-spacing: 0px;
    }
  }
`;

export const StyledDialogContentText = styled(DialogContentText)`
  && {
    font: 14px 'Roboto', sans-serif;
    letter-spacing: 0px;
    color: #8e8e8e;
  }
`;

export const StyledButton = styled(Button)`
  && {
    color: ${(props) => (props.primary ? '#8e5be8' : '#b2b2b2')};
    font: 14px 'Roboto', sans-serif;
  }
`;
