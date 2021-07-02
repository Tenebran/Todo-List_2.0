import React from 'react';
import './Button.scss';
import Button from '@material-ui/core/Button';

type ButtonPropsType = {
  title: string;
  callBack: () => void;
  nameClass: string;
};

export default function ButtonFilter(props: ButtonPropsType) {
  console.log(props.nameClass);
  return (
    <Button
      color={props.nameClass ? 'primary' : 'default'}
      variant="contained"
      className={props.nameClass}
      onClick={props.callBack}
    >
      {props.title}
    </Button>
  );
}
