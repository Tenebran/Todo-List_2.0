import { Dispatch } from 'redux';
import { appSetErrorAC, appSetStatusAC } from '../state/appReducer';
import { ResponseType } from '../../api/todolists-api';

export type ErrorUtilsActionType =
  | ReturnType<typeof appSetStatusAC>
  | ReturnType<typeof appSetErrorAC>;

export const handleServerNetworkError = (
  dispatch: Dispatch<ErrorUtilsActionType>,
  message: string
) => {
  dispatch(appSetErrorAC(message));
  dispatch(appSetStatusAC('failed'));
};

export const handleServerAppError = <T>(
  dispatch: Dispatch<ErrorUtilsActionType>,
  data: ResponseType<T>
) => {
  if (data.messages.length) {
    dispatch(appSetErrorAC(data.messages[0]));
    dispatch(appSetStatusAC('succeeded'));
  } else {
    dispatch(appSetErrorAC('Some Error'));
  }
};
