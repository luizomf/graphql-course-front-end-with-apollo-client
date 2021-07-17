import { makeVar, useReactiveVar } from '@apollo/client';
import { storageHelpers } from '../../utils/storage-helpers';

const simpleObjClone = (obj) => JSON.parse(JSON.stringify(obj));

const areObjectsEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
};

export const makeReactiveVar = (
  initialValue,
  storageKey,
  storageFunctions = storageHelpers,
  useStorage = true,
) => {
  const reactiveVar = makeVar({ ...initialValue });
  const savedInitialValue = simpleObjClone(initialValue);

  const set = (value) => {
    storageFunctions.add(storageKey, value);
    reactiveVar(value);
  };

  const get = () => {
    return reactiveVar();
  };

  const reset = () => {
    storageFunctions.delete(storageKey);
    reactiveVar(savedInitialValue);
  };

  const hydrate = () => {
    if (!useStorage) return;

    const localDataStr = storageFunctions.getRaw(storageKey);
    const reactiveVarData = get();

    if (!localDataStr) {
      if (!areObjectsEqual(reactiveVarData, savedInitialValue)) {
        reset();
      }
      return;
    }

    if (JSON.stringify(reactiveVarData) === localDataStr) {
      return;
    }

    const localDataObj = storageFunctions.get(storageKey);

    set(localDataObj);
  };

  const useHook = () => {
    hydrate();
    return useReactiveVar(reactiveVar);
  };

  return {
    get,
    set,
    hydrate,
    reset,
    useHook,
    reactiveVar,
  };
};
