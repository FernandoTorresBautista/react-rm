import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

import { CharactersEpisodes } from './rmJSON';
/*
const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;
*/
const InputWrapper = styled('div')`
  margin: 0 auto;
  width: 100%;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    text-align: center;
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
    <div {...props}>
        <span className={"searchOptions " + props.type} id={props.id} >{label}</span>
        <CloseIcon onClick={onDelete} />
    </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  margin: 0 auto;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

export default function CustomizedHook() {
    const {
        getRootProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'customized-hook-demo',
        defaultValue: [],
        multiple: true,
        options: CharactersEpisodes,
        getOptionLabel: (option) => option.name,
    });
    return (
        <NoSsr>
            <div >
                <div {...getRootProps()}>
                    <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                        {value.map((option, index) => (
                            <Tag type={option.type} id={option.id} label={option.name} {...getTagProps({ index })} />
                        ))}
                        <input placeholder={"Type something and select, can search episodes and characters..."} {...getInputProps()} />
                    </InputWrapper>
                </div>
                {groupedOptions.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                            <li {...getOptionProps({ option, index })}>
                                <span id={option.id}>{option.name}</span>
                                <CheckIcon fontSize="small" />
                            </li>
                        ))}
                    </Listbox>
                ) : null}
            </div>
        </NoSsr>
    );
}
/**
<input placeholder={"Type something and select, can search episodes and characters..."} {...getInputProps()} />

 */