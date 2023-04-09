import { useEffect, useState } from "react";
import { useFacilityContext } from "../../contexts/FacilityContext";

const useHome = () => {
  const { facility } = useFacilityContext();
  const [collectionType, setCollectionType] = useState("exam");
  const [collection, setCollection] = useState();

  const handleCollectionChange = (event, type) => {
    event.preventDefault();
    setCollectionType(type);
  };

  useEffect(() => {
    if (collectionType !== "exam") {
      setCollection(
        facility.members.filter((m) => m.role.toLowerCase() === collectionType)
      );
    }
  }, [facility, collectionType]);

  return { collectionType, handleCollectionChange, collection };
};

export default useHome;
