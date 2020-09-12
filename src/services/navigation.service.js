import { createRef } from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = createRef();
export const isReadyRef = createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  }
}

export function replace(name) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(name));
  }
}

export function reset(name) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.reset({
      routes: [{ name: name }]
    });
  }
}

export function push(...args) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.push(...args));
  }
}

export function pop(count = 1) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.pop(count));
  }
}

export default {
  navigate,
  push,
  pop
}