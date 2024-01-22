//these hooks are only required if using typescript

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

//use throughout app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//non TS code

// import { useDispatch, useSelector } from 'react-redux';

// export const useAppDispatch = () => useDispatch();
// export const useAppSelector = useSelector;
