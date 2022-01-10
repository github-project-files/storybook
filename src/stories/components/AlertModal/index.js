// @flow

import React from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter, type ModalHOCProps } from 'components/Modal';
import Button from 'components/Button';
import { colors } from 'utils/StyleGuide';
import { Wrapper } from './styled';

export type AlertModalProps = {
  header: string,
  body: string,
  maxWidth?: number,
  padding?: number,
  onConfirm: () => void | Promise<any>,
  confirmLabel?: string,
  onDeny?: () => void | Promise<any>,
  denyLabel?: string,
  onCancel?: () => void,
  cancelLabel?: string,
};

type Props = AlertModalProps & ModalHOCProps;

export default (props: Props) => {
  return (
    <Modal maxWidth={props.maxWidth || 540} padding={props.padding || 40}>
      <Wrapper>
        <ModalHeader
          onClose={props.onCancel || props.onClose}
          header={props.header}
          fontSize={18}
          fontWeight="600"
          color={colors.black}
          maxWidth={props.maxWidth || 540}
          padding={props.padding || 40}
          closeIconFill={colors.silver}
        />
        <ModalBody withPadding>{props.body}</ModalBody>
        <ModalFooter>
          {props.cancelLabel ? (
            <Button theme="cancel" size="xlg" onClick={props.onCancel || props.onClose}>
              {props.cancelLabel || props.t('generic.cancel')}
            </Button>
          ) : (
            <div />
          )}
          {props.denyLabel && props.onDeny ? (
            <Button theme="red" pill onClick={props.onDeny}>
              {props.denyLabel}
            </Button>
          ) : (
            <div />
          )}
          {props.confirmLabel ? (
            <Button theme="red" size="xxl" onClick={props.onConfirm}>
              {props.confirmLabel || props.t('generic.confirm')}
            </Button>
          ) : (
            <div />
          )}
        </ModalFooter>
      </Wrapper>
    </Modal>
  );
};
