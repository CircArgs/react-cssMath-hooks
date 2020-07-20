import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import toPX from "to-px";

function indexOf(arr, type) {
  if (arr.length === 0) {
    return -1;
  }

  var m = arr[0];
  var mIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (type === "max" ? arr[i] > m : arr[i] < m) {
      mIndex = i;
      m = arr[i];
    }
  }

  return mIndex;
}

const useMin = (...dims) => hof((...dims) => indexOf(...dims, "min"), ...dims);
const useMax = (...dims) => hof((...dims) => indexOf(...dims, "max"), ...dims);

const hof = (f, ...dims) => {
  const { height, width } = useWindowSize();
  const [d, setD] = useState(dims[0]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setD(dims[f(dims.map(toPX))]);
    }
  }, [typeof document, height, width]);
  return d;
};

const usePixels = (dim) => {
  const { height, width } = useWindowSize();
  const [d, setD] = useState(toPX(dim));

  useEffect(() => {
    if (typeof document !== "undefined") {
      setD(toPX(dim));
    }
  }, [typeof document, height, width]);
  return d;
};

export { useMin, useMax, usePixels };
