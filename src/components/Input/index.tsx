import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

const Input: React.FC<InputProps> = (props) => {
  const {fullWidth, submittable, ...rest} = props;
  return <>
    <input {...rest} className={[styles.input, fullWidth ? styles.fullWidth : ''].join(' ')} />
    {submittable && 
      <input type="submit" style={{display: 'none'}} />
    }
  </>
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  submittable?: boolean;
}

export default Input;