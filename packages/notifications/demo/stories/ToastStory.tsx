/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useCallback, useState } from 'react';
import { Story } from '@storybook/react';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { Button } from '@zendeskgarden/react-buttons';
import {
  Dropdown,
  MediaBody,
  MediaFigure,
  MediaItem,
  Menu,
  Trigger
} from '@zendeskgarden/react-dropdowns';
import {
  Close,
  IToastOptions,
  Notification,
  Title,
  ToastContent,
  useToast
} from '@zendeskgarden/react-notifications';

interface IArgs extends IToastOptions {
  children: string;
}

export const ToastStory: Story<IArgs> = ({ children, ...args }) => {
  const {
    addToast,
    removeToast,
    removeAllToasts: handleRemoveAll,
    updateToast,
    toasts
  } = useToast();
  const [removeRotated, setRemoveRotated] = useState<boolean | undefined>();

  const handleAdd = useCallback(() => {
    const getToast = (id?: string) => {
      const retVal: ToastContent = ({ close }) => (
        <Notification>
          {id && <Title>{id}</Title>}
          {children}
          <Close aria-label="Close" onClick={close} />
        </Notification>
      );

      return retVal;
    };

    const id = addToast(getToast(), args);

    updateToast(id, { content: getToast(id) });
  }, [addToast, updateToast, children, args]);

  return (
    <Grid>
      <Row style={{ height: 'calc(100vh - 80px)' }}>
        <Col sm={4} textAlign="center" textAlignSm="end" alignSelf="center">
          <Button onClick={handleAdd}>
            <Button.StartIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="none" stroke="currentColor" strokeLinejoin="round" d="M13.5 9.5s0-9-5.5-9-5.5 9-5.5 9C.65 9.5.44 11.15.46 12c.01.28.22.5.5.5h14.08c.28 0 .49-.22.5-.5.02-.85-.19-2.5-2.04-2.5zm-7 3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5"/>
</svg>
            </Button.StartIcon>
            Add
          </Button>
        </Col>
        <Col sm={4} textAlign="center" alignSelf="center">
          <Dropdown
            onSelect={id => removeToast(id)}
            onStateChange={options =>
              Object.prototype.hasOwnProperty.call(options, 'isOpen') &&
              setRemoveRotated(options.isOpen)
            }
          >
            <Trigger>
              <Button disabled={toasts.length === 0} isDanger>
                Remove
                <Button.EndIcon isRotated={removeRotated && toasts.length > 0}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path fill="currentColor" d="M12.688 5.61a.5.5 0 01.69.718l-.066.062-5 4a.5.5 0 01-.542.054l-.082-.054-5-4a.5.5 0 01.55-.83l.074.05L8 9.359l4.688-3.75z"/>
</svg>

                </Button.EndIcon>
              </Button>
            </Trigger>
            <Menu>
              {toasts.map(toast => (
                <MediaItem key={toast.id} value={toast.id} isDanger>
                  <MediaFigure>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <path stroke="currentColor" strokeLinecap="round" d="M3 13L13 3m0 10L3 3"/>
</svg>
                  </MediaFigure>
                  <MediaBody>{toast.id}</MediaBody>
                </MediaItem>
              ))}
            </Menu>
          </Dropdown>
        </Col>
        <Col sm={4} textAlign="center" textAlignSm="start" alignSelf="center">
          <Button isDanger disabled={toasts.length === 0} onClick={handleRemoveAll}>
            <Button.StartIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" focusable="false" viewBox="0 0 16 16">
  <g fill="none" stroke="currentColor">
    <circle cx="7.5" cy="8.5" r="7"/>
    <path strokeLinecap="round" d="M4.5 11.5l6-6m0 6l-6-6"/>
  </g>
</svg>
            </Button.StartIcon>
            Remove all
          </Button>
        </Col>
      </Row>
    </Grid>
  );
};
