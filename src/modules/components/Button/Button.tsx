import React from 'react';
import './Button.scss';

type ButtonPropsType = {
  title: string;
  callBack: () => void;
  nameClass: string;
};

export default function Button(props: ButtonPropsType) {
  return (
    <button className={props.nameClass} onClick={props.callBack}>
      {props.title}
    </button>
  );
}
