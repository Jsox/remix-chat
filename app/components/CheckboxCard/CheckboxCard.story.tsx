import { storiesOf } from '@storybook/react';
import attributes from './attributes.json';
import { StoryWrapper } from 'app/components/StoryWrapper/StoryWrapper';
import { CheckboxCard } from './CheckboxCard';

storiesOf('CheckboxCard', module).add('CheckboxCard', () => (
  <StoryWrapper attributes={attributes} component={CheckboxCard} />
));
