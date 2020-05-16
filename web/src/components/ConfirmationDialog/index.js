import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import {
  StyledDialogTitle,
  StyledDialogContentText,
  StyledButton,
} from './styles';

export default function ConfirmDialog(props) {
  const { title, message, open, setOpen, onConfirm } = props;

  function handleClose() {
    setOpen(false);
  }

  function handleConfirm() {
    onConfirm();
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <StyledDialogTitle id="alert-dialog-title">{title}</StyledDialogTitle>
        <DialogContent>
          <StyledDialogContentText id="alert-dialog-description">
            {message}
          </StyledDialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose} color="primary">
            Não
          </StyledButton>
          <StyledButton
            primary="true"
            onClick={handleConfirm}
            color="primary"
            autoFocus
          >
            Sim
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
