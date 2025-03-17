import { useState } from "react"; 

export const useLoader = () => {
  const [loader, setLoader] = useState<boolean>(false);
  return { loader, setLoader };
};
