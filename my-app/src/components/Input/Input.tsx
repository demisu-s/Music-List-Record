import { ChangeEvent } from "react";
import style from "./Input.module.css";
export interface IPprops {
  label: string;
  value: string;
  type?: string;
  onChange: (e:ChangeEvent<HTMLInputElement>) =>void;
}
export const Input = (props: IPprops) => {
  const { label, value, type='text', onChange } = props;
  return (
    <div className={style.container}>
      <label>{label}:</label>
      <div>
        <input
          type={type}
          value={value}
          className={style.input}
          onChange={onChange}
            
          
        />
      </div>
    </div>
  );
};
