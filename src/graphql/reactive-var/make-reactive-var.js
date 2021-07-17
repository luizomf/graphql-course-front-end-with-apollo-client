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
) => {
  const reactiveVar = makeVar({ ...initialValue });
  const savedInitialValue = simpleObjClone(initialValue);

  const setVar = (value) => {
    storageFunctions.add(storageKey, value);
    reactiveVar(value);
  };

  const getVar = () => {
    return reactiveVar();
  };

  const resetVar = () => {
    storageFunctions.delete(storageKey);
    reactiveVar(savedInitialValue);
  };

  const hydrate = () => {
    const localDataStr = storageFunctions.getRaw(storageKey);
    const reactiveVarData = getVar();

    if (!localDataStr) {
      if (!areObjectsEqual(reactiveVarData, savedInitialValue)) {
        resetVar();
      }
      return;
    }

    if (JSON.stringify(reactiveVarData) === localDataStr) {
      return;
    }

    const localDataObj = storageFunctions.get(storageKey);

    setVar(localDataObj);
  };

  const useHook = () => {
    hydrate();
    return useReactiveVar(reactiveVar);
  };

  return {
    getVar,
    setVar,
    hydrate,
    resetVar,
    useHook,
    reactiveVar,
  };
};
