import { useEffect, useRef, useState } from "react";

import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import { useHapticFeedback } from "@/hooks/useHapticFeedback";

interface IModalProps {
  isVisible: boolean;
  children?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  onClose: () => void;
}

export const Modal = ({
  isVisible,
  children,
  className,
  overlayClassName,
  onClose,
}: IModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { handleSelectionChanged } = useHapticFeedback();

  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    handleSelectionChanged();
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cx(
            "fixed inset-0 z-40 bg-blue-800/80 backdrop-blur",
            overlayClassName,
          )}
          style={{
            backdropFilter: `blur(${8 - dragY / 50}px)`,
          }}
          onClick={handleClose}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2 },
          }}
        >
          <motion.div
            className={cx("fixed inset-0 z-50 overflow-y-auto")}
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
              transition: { duration: 0.2 },
            }}
            exit={{
              y: "100%",
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              ref={modalRef}
              className="box-border flex min-h-screen items-end justify-center font-rubik"
              drag="y"
              dragElastic={{
                top: 0,
                bottom: 0.3,
              }}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDrag={(_, info) => {
                setDragY(info.offset.y);
              }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) {
                  handleClose();
                }
                setDragY(0);
              }}
            >
              <div
                className={className}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
