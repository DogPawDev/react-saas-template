import React, { useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import RegisterDialog from "./RegisterDialog";

import LoginDialog from "./LoginDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ModalBackdrop from "../../../shared/components/ModalBackdrop";

function DialogSelector(props) {
  const {
    dialogOpen,
    openTermsDialog,
    openLoginDialog,
    openChangePasswordDialog,
    onClose,
  } = props;
  const [loginStatus, setLoginStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(null);

  const _onClose = useCallback(() => {
    setLoginStatus(null);
    setRegisterStatus(null);
    onClose();
  }, [onClose, setLoginStatus, setRegisterStatus]);

  const printDialog = useCallback(() => {
    switch (dialogOpen) {
      case "register":
        return (
          <RegisterDialog
            onClose={_onClose}
            openTermsDialog={openTermsDialog}
            status={registerStatus}
            setStatus={setRegisterStatus}
          />
        );
      case "login":
        return (
          <LoginDialog
            onClose={_onClose}
            status={loginStatus}
            setStatus={setLoginStatus}
            openChangePasswordDialog={openChangePasswordDialog}
          />
        );
      case "changePassword":
        return (
          <ChangePasswordDialog
            setLoginStatus={setLoginStatus}
            onClose={openLoginDialog}
          />
        );
      default:
    }
  }, [dialogOpen, _onClose, openTermsDialog, registerStatus, loginStatus, openChangePasswordDialog, openLoginDialog]);

  return (
    <Fragment>
      {dialogOpen && <ModalBackdrop open />}
      {printDialog()}
    </Fragment>
  );
}

export default DialogSelector;
