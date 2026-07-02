import { useState } from "react";
import data from "./data";

function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiselection, setEnableMultiselection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (currentId) => {
    setSelected(currentId === selected ? null : currentId);
  };

  const handleMultipleSelection = (currentId) => {
    const copyMultiple = [...multiple];
    const indexOfCurrentId = copyMultiple.indexOf(currentId);

    if (indexOfCurrentId == -1) copyMultiple.push(currentId);
    else copyMultiple.splice(indexOfCurrentId, 1);

    setMultiple(copyMultiple);
  }

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiselection(!enableMultiselection)} className={enableMultiselection ? "btn-enabled" : "btn-disabled"}>Enable Multiselection</button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="accordion-item" key={dataItem.id}>
              <div
                className="accordion-question"
                onClick={
                  enableMultiselection ? 
                  () => handleMultipleSelection(dataItem.id) :
                  () => handleSingleSelection(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span>{
                  enableMultiselection ?
                  (multiple.indexOf(dataItem.id) !== -1 ? "-" : "+")
                  : selected === dataItem.id ? "-" : "+"}</span>
              </div>

              {
                enableMultiselection ?
                multiple.indexOf(dataItem.id) !== -1 && (
                  <div className="accordion-answer">
                    <p>{dataItem.answer}</p>
                  </div>
                )
                : selected === dataItem.id && (
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