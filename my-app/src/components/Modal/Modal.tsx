import style from "./ModalStyle.module.css"

interface IProps{
    title:string;
    children:JSX.Element;
    onClose:()=>void
}

export const Modal=(props:IProps)=>{
const {title,children,onClose}=props

    return <div id="myModal" className={style.modal}>
<div className={style["modal-content"]}>
    <span className={style.close} onClick={onClose}>&times;</span>
    <h2>{title}</h2>
    {children}
</div>
    </div>
}