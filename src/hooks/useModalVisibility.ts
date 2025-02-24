import { useEffect, useState } from "react";

export const useModalVisibility = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(true);
    }, 0);
  }, []);

  return { isModalVisible };
};
