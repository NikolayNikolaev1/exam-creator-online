import { createContext, useContext, useEffect, useState } from "react";
import { getFacility } from "../services/facilityService";
import { useAuthContext } from "./AuthContext";

export const FacilityContext = createContext();

export const FacilityProvider = ({ children }) => {
  const { auth } = useAuthContext();
  const [facility, setFacility] = useState({});

  useEffect(() => {
    if (typeof auth.facilityId === "undefined") {
      setFacility({});
      return;
    }

    (async () =>
      await getFacility(auth.facilityId).then((response) =>
        setFacility({
          ...response,
          exams: response.exams.filter((e) => {
            switch (auth.role) {
              case "Lecturer":
                return e.lecturerId === auth.id;
              case "Student":
                return e.studentIds.includes(auth.id);
              case "Owner":
                return e;
            }
          }),
        })
      ))();
  }, [auth]);

  return (
    <FacilityContext.Provider value={facility}>
      {children}
    </FacilityContext.Provider>
  );
};

export const useFacilityContext = () => useContext(FacilityContext);
