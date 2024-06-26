import { MessageResponse } from '@/types/api-types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';

export const getLastMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const last6Months: string[] = [];
  const last12Months: string[] = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = currentDate.clone().subtract(i, 'months');
    const monthName = monthDate.format('MMMM');
    last6Months.unshift(monthName);
  }

  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, 'months');
    const monthName = monthDate.format('MMMM');
    last12Months.unshift(monthName);
  }

  return {
    last12Months,
    last6Months,
  };
};

type ResType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string,
) => {
  if ('data' in res) {
    // If 'data' exists in res, it means it's a successful response
    toast.success(res.data.message);
    if (navigate) {
      navigate(url);
    }
  } else {
    // If 'error' exists in res, it means it's an error response
    const error = res.error;
    if ('data' in error && (error.data as MessageResponse).message) {
      // We have a MessageResponse error
      toast.error((error.data as MessageResponse).message);
    } else {
      // We have another type of error
      toast.error('An error occurred');
    }
  }
};
