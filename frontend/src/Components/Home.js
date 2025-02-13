import { onCLS } from "web-vitals";
import Products from "./Products";
export default function Home({handleClick}) {
  return (
    <div>
      <Products handleClick={handleClick}/>
    </div>
  );
}
