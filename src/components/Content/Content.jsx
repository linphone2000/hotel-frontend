import { useData } from "../../context/DataContext";
import "./Content.css";

const Content = () => {
  const { fruits } = useData();
  return (
    <>
      <div className="content-container">
        <h1 className="py-4 text-9xl text-stone-900">U Thein Kyaw</h1>
        <ul className="grid grid-cols-3 gap-4">
          {fruits.map((fruit, index) => (
            <li className="head" key={index}>
              {fruit.name}
              <ul>
                <li className="list-item">{fruit.rating}</li>
                <li className="list-item">{fruit.review}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Content;
