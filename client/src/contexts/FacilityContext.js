import { createContext, useContext, useEffect, useState } from "react";
import { getFacility } from "../services/facilityService";
import { useAuthContext } from "./AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

export const FacilityContext = createContext();

export const FacilityProvider = ({ children }) => {
  const { auth } = useAuthContext();
  const [facility, setFacility] = useLocalStorage("facility", {});
  const [facilityOwnerId, setFacilityOwnerId] = useState();

  const fetchFacilityData = async () => {
    await getFacility(auth.facilityId).then((facilityData) => {
      setFacility({
        ...facilityData,
        exams: facilityData.exams.filter((e) => {
          switch (auth.role) {
            case "Lecturer":
              return e.lecturerId === auth.id;
            case "Student":
              return e.studentIds.includes(auth.id);
            case "Owner":
              return e;
          }
        }),
      });

      setFacilityOwnerId(
        facilityData.members.find((m) => m.role === "Owner").id
      );
    });
  };

  useEffect(() => {
    if (typeof auth.facilityId === "undefined") {
      setFacility({});
      return;
    }

    (async () => await fetchFacilityData())();
  }, [auth.id]);

  return (
    <FacilityContext.Provider
      value={{ facility, setFacility, facilityOwnerId, fetchFacilityData }}
    >
      {children}
    </FacilityContext.Provider>
  );
};

export const useFacilityContext = () => useContext(FacilityContext);
