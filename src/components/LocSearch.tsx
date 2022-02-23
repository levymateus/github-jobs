/**
 * Location Search component
 */
import React, { useEffect, useState } from 'react';
import { Checkbox, Radio } from 'components/Input';
import { H3 } from 'components/Typo';
import { Search } from 'components/Search';
import styled from 'styled-components';
import useDebounce from 'hooks/useDebounce';
import type { Field } from '../types';

export type LocSearchProps = {
  onChange?: (field: Field) => void
}

const Form = styled.form`
  width: 100%;
  label {
    margin-left: 12px;
  }
  h3 {
    margin-top: 30px;
    margin-bottom: 14px;
  }
`;

const Location = styled.div`
  margin-top: 24px;
  label + label {
    margin-top: 16px;
  }
`;

export function LocSearch({ onChange }: LocSearchProps) {
  const [field, setField] = useState<Field>({ name: '', value: '', checked: false });
  const search = useDebounce<Field>(field, 500);

  useEffect(() => {
    if (search.name && search.name === 'city,state,zip,country' && onChange) {
      onChange(search);
    }
  }, [search]);

  useEffect(() => {
    if (field.name && field.name !== 'city,state,zip,country' && onChange) {
      onChange(field);
    }
  }, [field]);

  return (
    <Form
      onSubmit={(evt) => evt.preventDefault()}
      onChange={(evt) => {
        const { name, value, checked } = evt.target as HTMLInputElement;
        setField({ name, value, checked });
      }}
    >
      <Checkbox
        id="fulltime-checkbox"
        name="fulltime"
        label="Full time"
        defaultChecked
      >
        Full time
      </Checkbox>
      <H3>Location</H3>
      <Search
        icon="public"
        name="city,state,zip,country"
        placeholder="City, state, zip code or country"
      />
      <Location>
        <Radio name="city" label="Europe" value="europe" defaultChecked />
        <Radio name="city" label="London" value="london" />
        <Radio name="city" label="Amsterdam" value="amsterdam" />
        <Radio name="city" label="New York" value="new york" />
        <Radio name="city" label="Berlin" value="berlin" />
      </Location>
    </Form>
  );
}

export default LocSearch;
