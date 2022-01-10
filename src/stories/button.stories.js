import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/Button';

storiesOf('Button', module)
  .add('with primary', () => <Button onClick={action('click')} label="Primary Button" />)
  .add('with outline', () => <Button onClick={action('click')}
    label="Ouline Button"
    style={{ background: 'transparent', border: '3px solid #fecd43' }}
  />)
  .add('with rounder corners', () => <Button onClick={action('click')}
    label="Rounded Button"
    style={{ borderRadius: '15px' }}
  />)
  .add('disabled', () => <Button disabled onClick={action('click')}
    label="Disabled Button"
    style={{ background: 'gray' , border: 'gray', cursor: 'not-allowed' }}
  />);
