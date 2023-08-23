import GlobalNav from "./GlobalNav";
import style from "./Layout.module.css"
import {NavLink} from "react-router-dom"
const Layout = () => {
  return <>
<article className={style.header}>
     <header>
      <div className="re">
        
      <GlobalNav />

      </div>

     </header>
</article>
<section className={style["content-section"]}>
    < GlobalNav />
   <div>This is Section</div> 
</section>
  </>;
};

export default Layout;

