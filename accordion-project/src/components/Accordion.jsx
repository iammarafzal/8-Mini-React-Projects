import { useState } from "react";
import data from "./data";

function Accordion() {
  const [selected, setSelected] = useState(null);

  const handleSingleQuestion = (currentId) => {
    setSelected(currentId === selected ? null : currentId);
  };

  return (
    <div className="wrapper">
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="accordion-item" key={dataItem.id}>
              <div
                className="accordion-question"
                onClick={() => handleSingleQuestion(dataItem.id)}
              >
                <h3>{dataItem.question}</h3>
                <span>{selected === dataItem.id ? "-" : "+"}</span>
              </div>

              {selected === dataItem.id && (
                <div className="accordion-answer">
                  <p>{dataItem.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-data">No data found</div>
        )}
      </div>
    </div>
    
  );
}

export default Accordion;