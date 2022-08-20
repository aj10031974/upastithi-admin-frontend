import React from "react";

import DatamapsIndia from "react-datamaps-india";

const Example = () => {
  return (
    <div>
      <div className="row">
        <div className="col-xl-6 col-sm-6 grid-margin stretch-card" style={{height:"80vh"}}>
          <div className="card">
              <DatamapsIndia
                regionData={{
                  Maharashtra: {
                    value: 10,
                  },Gujarat: {
                    value: 5,
                  },
                }}
                hoverComponent={({ value }) => {
                  return (
                    <>
                      <p>{value.name}</p>
                      <p>{value.value}</p>
                    </>
                  );
                }}
                mapLayout={{
                  title: "Statwise Student Data",
                  legendTitle: "Legend Title",
                  startColor: "#FFDAB9",
                  endColor: "#FF6347",
                  hoverTitle: "Count",
                  noDataColor: "#f5f5f5",
                  borderColor: "#8D8D8D",
                  hoverBorderColor: "#8D8D8D",
                  hoverColor: "green",
                }}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
