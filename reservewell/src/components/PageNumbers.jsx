import React, { useState } from "react";
import LeftIcon from "@mui/icons-material/ChevronLeft";
import RightIcon from "@mui/icons-material/ChevronRight";

const PageNumbers = ({
  paginate,
  itemsPerPage,
  totalItems,
  currentPageNumber,
}) => {
  const [selectedButton, setSelectedButton] = useState(1);
  const pageNumbers = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const lastPageNumber = pageNumbers.length;

  const pageNumberHandler = (event) => {
    setSelectedButton(parseInt(event.target.innerHTML, 10));
    paginate(parseInt(event.target.innerHTML, 10));
  };

  const prevPageHandler = () => {
    if (currentPageNumber !== 1) {
      setSelectedButton(currentPageNumber - 1);
      paginate(currentPageNumber - 1);
    }
  };

  const nextPageHandler = () => {
    if (currentPageNumber !== lastPageNumber) {
      setSelectedButton(currentPageNumber + 1);
      paginate(currentPageNumber + 1);
    }
  };

  const buttonClasses = "px-4 py-3";
  const buttonClassesActive =
    "px-4 py-3 font-bold rounded-lg bg-white text-rwBlack";

  return (
    <nav className="my-4 flex w-fit items-center rounded-lg bg-prim p-1 text-white">
      <button onClick={prevPageHandler} className="mx-2 text-xl font-bold">
        <LeftIcon />
      </button>
      <div className="flex items-center">
        {lastPageNumber < 6 ? (
          <ul className="flex items-center">
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={pageNumberHandler}
                  className={
                    number === selectedButton
                      ? buttonClassesActive
                      : buttonClasses
                  }
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex items-center">
            {currentPageNumber < 3 && (
              <ul className="flex items-center">
                {pageNumbers.slice(0, 3).map((number) => (
                  <li key={number}>
                    <button
                      onClick={pageNumberHandler}
                      className={
                        number === selectedButton
                          ? buttonClassesActive
                          : buttonClasses
                      }
                    >
                      {number}
                    </button>
                  </li>
                ))}
                ...
                {pageNumbers
                  .slice(lastPageNumber - 1, lastPageNumber)
                  .map((number) => (
                    <li key={number}>
                      <button
                        onClick={pageNumberHandler}
                        className={
                          number === selectedButton
                            ? buttonClassesActive
                            : buttonClasses
                        }
                      >
                        {number}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
            {currentPageNumber > 2 &&
              currentPageNumber < lastPageNumber - 1 && (
                <ul className="flex items-center">
                  {pageNumbers.slice(0, 1).map((number) => (
                    <li key={number}>
                      <button
                        onClick={pageNumberHandler}
                        className={
                          number === selectedButton
                            ? buttonClassesActive
                            : buttonClasses
                        }
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                  ...
                  {pageNumbers
                    .slice(currentPageNumber - 2, currentPageNumber + 1)
                    .map((number) => (
                      <li key={number}>
                        <button
                          onClick={pageNumberHandler}
                          className={
                            number === selectedButton
                              ? buttonClassesActive
                              : buttonClasses
                          }
                        >
                          {number}
                        </button>
                      </li>
                    ))}
                  ...
                  {pageNumbers
                    .slice(lastPageNumber - 1, lastPageNumber)
                    .map((number) => (
                      <li key={number}>
                        <button
                          onClick={pageNumberHandler}
                          className={
                            number === selectedButton
                              ? buttonClassesActive
                              : buttonClasses
                          }
                        >
                          {number}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            {currentPageNumber > lastPageNumber - 2 && (
              <ul className="flex items-center">
                {pageNumbers.slice(0, 1).map((number) => (
                  <li key={number}>
                    <button
                      onClick={pageNumberHandler}
                      className={
                        number === selectedButton
                          ? buttonClassesActive
                          : buttonClasses
                      }
                    >
                      {number}
                    </button>
                  </li>
                ))}
                ...
                {pageNumbers
                  .slice(lastPageNumber - 3, lastPageNumber)
                  .map((number) => (
                    <li key={number}>
                      <button
                        onClick={pageNumberHandler}
                        className={
                          number === selectedButton
                            ? buttonClassesActive
                            : buttonClasses
                        }
                      >
                        {number}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </ul>
        )}
      </div>
      <button onClick={nextPageHandler} className="mx-2 text-xl font-bold">
        <RightIcon />
      </button>
    </nav>
  );
};

export default PageNumbers;
